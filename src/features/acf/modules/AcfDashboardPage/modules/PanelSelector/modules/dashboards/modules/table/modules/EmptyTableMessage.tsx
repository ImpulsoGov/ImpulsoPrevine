export const EmptyTableMessage = () => {
  return (
    <p
        style={{ textAlign: "center", padding: "40px" }}
        data-testid="error-message-table"
    >
        Nenhum dado disponível. Isso pode ocorrer por
        ausência de resultados ou instabilidade na
        plataforma. Se já aplicou filtros ou utilizou a
        busca, tente ajustá-los. Se ainda assim os dados
        não foram exibidos, contate o suporte.
    </p>
  )
}
