export async function getScammers() {
  try {
    const response = await fetch('/api/scammers');
    if (!response.ok) throw new Error('Erro ao buscar scammers');
    return await response.json();
  } catch (error) {
    console.error('Erro:', error);
    return [];
  }
}

export async function reportScammer(id: string) {
  try {
    const response = await fetch(`/api/scammers/${id}/report`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Erro ao reportar scammer');
    return await response.json();
  } catch (error) {
    console.error('Erro:', error);
    return null;
  }
} 