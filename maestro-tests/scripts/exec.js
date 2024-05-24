if (typeof command === 'undefined') {
    throw new Error('missing command');
}



const response = http.post('http://127.0.0.1:4567/exec', {
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        args: [command],
    }),
});

const parsed = json(response.body);

const result = {
    stdout: parsed.stdout,
    stderr: parsed.stderr,
    exitCode: parsed.exitCode,
};

if (parseJson) {
    result.json = json(parsed.stdout);
}

output.exec = result;

if (typeof resultId !== 'undefined') {
    output[resultId] = result;
}
