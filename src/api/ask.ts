export async function askQuestion(question: string) {
  const response = await fetch("YOUR_API_ENDPOINT", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer YOUR_API_KEY`,
    },
    body: JSON.stringify({ question }),
  });

  const data = await response.json();
  return data.answer;
}
