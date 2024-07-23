const response = http.post('http://127.0.0.1:4567/', {
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        baseline: baseline,
        current: current
    }),
});

const parsed = json(response.body);

output.diff = parsed.diff;
