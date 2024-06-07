export default async function postChat(
  prompt: string
): Promise<{ answer: string }> {
  return fetch(`/api/chat/`, {
    method: "POST",
    body: JSON.stringify({ prompt }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
