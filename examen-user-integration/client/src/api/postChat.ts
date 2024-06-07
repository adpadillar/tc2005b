export default async function postChat(
  prompt: string,
  rag?: boolean
): Promise<{ answer: string }> {
  return fetch(`/api/chat/`, {
    method: "POST",
    body: rag ? JSON.stringify({ prompt, rag }) : JSON.stringify({ prompt }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
