interface UserData {
  mail: string;
  municipio: string;
  municipio_id_sus: string;
  cargo: string;
}

export function isTestUser({
  mail,
  municipio,
  municipio_id_sus,
  cargo,
}: UserData): boolean {
  return (
    cargo === 'Impulser'
    || mail.includes('@impulsogov.org')
    || municipio.includes('Impulsolândia')
    || municipio_id_sus === '111111'
  );
}
