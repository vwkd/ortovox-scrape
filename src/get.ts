/**
 * Fetch page
 *
 * @param url URL of page
 * @returns HTML of page
 */
export async function get(url: string): Promise<string> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Got error: ${res.status} ${res.statusText}`);
  }

  const html = await res.text();

  return html;
}
