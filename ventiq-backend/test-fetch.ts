import fetch from 'node-fetch';
async function run() {
  try {
    const res = await fetch('http://localhost:9000/api/ideas');
    console.log(res.status);
    const text = await res.text();
    console.log(text);
  } catch (err) {
    console.error(err);
  }
}
run();
