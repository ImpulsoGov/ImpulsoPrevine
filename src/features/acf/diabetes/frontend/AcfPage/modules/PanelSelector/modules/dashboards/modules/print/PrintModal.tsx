// import { labelsModalImpressaoAPS, labelsModalImpressaoEquipe } from "@/helpers/labelsModalImpressao"
// import { VALORES_AGRUPAMENTO_IMPRESSAO } from "@/helpers/lista-nominal/impressao/handlePrint"
// import { PROFILE_ID } from "@/types/profile"
// import { ModalAlertControlled, PersonalizacaoImpressao } from "@impulsogov/design-system"
// import type { Session } from "next-auth"
// import type { PrintOptions } from "../../List"

// type PrintModalProps = {
//     isPrintModalVisible: boolean
//     closePrintModal: () => void
//     handleCostumizePrint: (options: PrintOptions)=>Promise<void>
//     userProfiles: Session["user"]["perfis"]
// }

// export const PrintModal = ({
//     isPrintModalVisible,
//     closePrintModal,
//     handleCostumizePrint,
//     userProfiles,
// }: PrintModalProps) => {
//   return (
//     <div
//         style={{
//             position: "absolute",
//             left: 0,
//         }}
//     >
//         <ModalAlertControlled
//             display={isPrintModalVisible}
//             close={closePrintModal}
//         >
//             <PersonalizacaoImpressao
//                 labels={
//                     userProfiles.includes(PROFILE_ID.COEQ)
//                         ? labelsModalImpressaoEquipe
//                         : labelsModalImpressaoAPS
//                 }
//                 handleButtonClick={handleCostumizePrint}
//                 handleClose={closePrintModal}
//                 valoresAgrupamento={VALORES_AGRUPAMENTO_IMPRESSAO}
//             />
//         </ModalAlertControlled>
//     </div>
//   )
// }
