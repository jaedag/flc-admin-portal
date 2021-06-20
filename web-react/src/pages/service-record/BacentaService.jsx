import React from 'react'
// import { ChurchContext } from '../../contexts/ChurchContext'
// import * as Yup from 'yup'
// import { DECIMAL_NUM_REGEX_POSITIVE_ONLY } from '../../global-utils'

const BacentaService = () => {
  //   const { bacentaId } = useContext(ChurchContext)

  //   const initialValues = {
  //     date: '',
  //     cediOfferingAmount: '',
  //     otherOfferingAmount: '',
  //     numberOfTithers: '',
  //     attendance: '',
  //     treasurers: [''],
  //     treasurerSelfie: '',
  //   }

  //   const validationSchema = Yup.object({
  //     date: Yup.date()
  //       .max(new Date(), 'Service could not possibly have happened after today')
  //       .required('Date is a required field'),
  //     cediOfferingAmount: Yup.string()
  //       .required('You must fill in your offering amount')
  //       .test('is-decimal', 'Please enter valid coordinates', (value) =>
  //         (value + '').match(DECIMAL_NUM_REGEX_POSITIVE_ONLY)
  //       ),
  //     otherOfferingAmount: Yup.string().test(
  //       'is-decimal',
  //       'Please enter valid coordinates',
  //       (value) => (value + '').match(DECIMAL_NUM_REGEX_POSITIVE_ONLY)
  //     ),
  //     numberOfTithers: Yup.number().positive().required(),
  //     attendance: Yup.number().positive().required(),
  //     treasurerSelfie: Yup.string().required('You must take a treasurers selfie'),
  //   })

  //   const [image, setImage] = useState('')
  //   const [loading, setLoading] = useState(false)
  //   const history = useHistory()
  //   const uploadImage = async (e) => {
  //     const files = e.target.files
  //     const data = new FormData()
  //     data.append('file', files[0])
  //     data.append('upload_preset', 'admin-portal')

  //     setLoading(true)

  //     const res = await fetch(
  //       'https://api.cloudinary.com/v1_1/firstlovecenter/image/upload',
  //       {
  //         method: 'POST',
  //         body: data,
  //       }
  //     )
  //     const file = await res.json()

  //     setImage(file.secure_url)
  //     setLoading(false)
  //   }

  return <div>Record Bacenta Service Component</div>
}

export default BacentaService
