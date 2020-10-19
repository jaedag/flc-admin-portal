import React from 'react'
// import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
// import { useCombobox } from 'downshift'
import FormikControl from './formik-components/FormikControl'
// import { GLOBAL_SEARCH } from '../queries/SearchQuery'
// import { MemberContext } from '../context/MemberContext'

const initialValues = {
  searchKey: '',
}
const validationSchema = Yup.object({
  searchKey: Yup.string().required(''),
})

export const NavBar = () => {
  //All of the Hooks!
  // const { setMemberID } = useContext(MemberContext)

  // const handleInput = (e) => {
  // 	searchData.setMemberData({
  // 		...searchData.memberData,
  // 		searchKey: e.target.value
  // 	})
  // 	// console.log(searchData.memberData.searchKey)
  // }
  // const [ inputItems, setInputItems ] = useState([])
  // const [ users, setUsers ] = useState([])
  // const [ setSingleUser ] = useState('')

  // const { isOpen, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps } = useCombobox({
  // 	items: inputItems,
  // 	onInputValueChange: ({ inputValue }) => {
  // 		setInputItems(users.filter((item) => item.firstName.toLowerCase().startsWith(inputValue.toLowerCase())))
  // 	}
  // })

  const onSubmit = (values, onSubmitProps) => {
    console.log('Form data', values)
    // setSearchKey(values.searchKey)
    // memberSearch({
    // 	variables: {
    // 		searchKey: values.searchKey
    // 	}
    // })
    onSubmitProps.resetForm()
  }

  return (
    <nav className="navbar navbar-dark navbar-expand fixed-top">
      <a className="btn nav-button btn-outline-light" href="/">
        <i className="fas fa-bars fa-2x icon-color" />
      </a>

      <div className="navbar-nav">
        <Link
          className="nav-item nav-link d-flex align-items-center flex-column"
          to="/"
        >
          <span className="fas fa-home fa-2x  px-1" />
          <span className="d-none d-md-inline">Dashboard</span>
        </Link>
        <Link
          className="nav-item nav-link d-flex align-items-center flex-column"
          to="/members"
        >
          <span className="fas fa-users fa-2x px-1" />
          <span className="d-none d-md-inline">Members</span>
        </Link>
        <Link
          className="nav-item nav-link d-flex align-items-center flex-column"
          to="/centre"
        >
          <span className="fas fa-landmark fa-2x px-1" />
          <span className="d-none d-md-inline">Communities</span>
        </Link>
        <Link
          className="nav-item nav-link d-flex align-items-center flex-column"
          to="/"
        >
          <span className="fas fa-church fa-2x px-1" />
          <span className="d-none d-md-inline">Ministries</span>
        </Link>
        <Link
          className="nav-item nav-link d-flex align-items-center flex-column"
          to="#"
        >
          <i className="fas fa-search fa-2x d-md-none icon-color px-1" />
        </Link>
      </div>
      <div className="container justify-content-end mt-2">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form className="form-inline d-none d-md-block">
              <div className="form-row">
                <div
                  className="col px-0 p- dropdown"
                  // {...getComboboxProps()}
                >
                  <FormikControl
                    className="form-control nav-search-box m-0"
                    control="input"
                    type="text"
                    placeholder="Search"
                    name="searchKey"
                    // {...getInputProps()}
                  />
                  {/* <ul {...getMenuProps()}>
										{isOpen &&
											inputItems.map((item, index) => (
												<span
													key={item.id}
													{...getItemProps({ item, index })}
													onClick={() => {
														setMemberID(item.memberID)
													}}>
													<li
														style={
															highlightedIndex === index ? { background: '#ede' } : {}
														}>
														<h4>{item.name}</h4>
													</li>
												</span>
											))}
									</ul> */}
                </div>
                <div className="col p-0">
                  <button
                    className="btn btn-primary nav-search-button"
                    type="submit"
                  >
                    <i className="fas fa-search icon-color" />
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <Link
          className="nav-item nav-link d-flex align-items-center flex-column"
          to="#"
        >
          <span className="fas fa-user-circle fa-2x" />
          <span className="d-none d-sm-inline">Admin</span>
        </Link>
      </div>
    </nav>
  )
}
