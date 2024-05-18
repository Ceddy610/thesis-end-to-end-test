import process from 'child_process';
import express from 'express';
import { Buffer } from 'node:buffer';

const host = '127.0.0.1';
const port = 4567;

const app = express();

app.use(express.json());

app.listen(port, host, () => {
  console.log(`Listening on ${host}:${port}`);
});

app.post('/exec', (req, res) => {
  const args = req.body.args;
  if (!isStringArray(args)) {
    res.status(400).send({
      error: 'invalid args',
    });
    return;
  }

  const proc = process.spawn(args[0], args.slice(1), {
    shell: true,
  });

  const stdout: Buffer[] = [];
  const stderr: Buffer[] = [];

  proc.stdout.on('data', (data) => stdout.push(data));
  proc.stderr.on('data', (data) => stderr.push(data));

  proc.on('error', (err) => {
    res.status(500).send({
      exitCode: 127,
      stdout: '',
      stderr: err,
    });
  });

  proc.on('close', (exitCode) => {
    if (!res.headersSent) {
      const responseStatus = exitCode === 0 ? 200 : 500;
      res.status(responseStatus).send({
        exitCode,
        stdout: Buffer.concat(stdout).toString('utf-8'),
        stderr: Buffer.concat(stderr).toString('utf-8'),
      });
    }
  });
});

function isStringArray(v: string[] | unknown): v is string[] {
  if (!Array.isArray(v)) {
    return false;
  }

  return v.every((i) => typeof i === 'string');
}
