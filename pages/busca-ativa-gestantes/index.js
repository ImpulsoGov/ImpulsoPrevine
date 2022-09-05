import { IFrame } from "@impulsogov/design-system";

import { getData } from '../../utils/cms'
import { LAYOUT } from '../../utils/QUERYS'

export async function getStaticProps() {
  const res = [
    await getData(LAYOUT),
  ]
  return {
    props: {
      res : res
    }
  }
}




const Index = ({res}) => {
  return (
      <IFrame
        height="2000"
        link="https://datastudio.google.com/embed/reporting/bf7923fb-24b9-4cbf-81ab-8ba507d13a97/page/NvkxC"
      />
  )
}

export default Index;