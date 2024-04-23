export const addressData = [
    {
        id: "a167b63e-b219-4680-9062-c9c32fed66a3",
        city: "Shillong",
        state: "Meghalaya",
        zipCode: "796901",
        street: "town",
        locality: "Happy Valley",
        landmark: "Block-A"
    },
    {
        id: "c294db22-4775-46c9-b10d-f91d711fa007",
        city: "Dhemaji",
        state: "Assam",
        zipCode: "787057",
        street: "gowal",
        locality: "Police Bazar",
        landmark: "Block-B"
    }
]
    
// {expandedAddresses[ad.orderId] && (
//     <Accordion>

//         <AccordionDetails>
//             <div className="billing-address">
//                 <Formik
//                     initialValues={initialValues2}
//                     validationSchema={validationSchema}
//                     onSubmit={onSubmit2}
//                 >
//                     {({ errors, touched, isSubmitting }) => (
//                         <Form>
//                             <div className="form-control">
//                                 {/* address-detail */}
//                                 <div className="address-bar">
//                                     <div className="thirdrow">
//                                         <Field
//                                             name="address"
//                                             as={TextField}
//                                             id="outlined-multiline-static"
//                                             label="Address (Area and Streets)"
//                                             multiline
//                                             rows={3}
//                                             fullWidth
//                                             error={touched.address && !!errors.address}
//                                             helperText={touched.address && errors.address}
//                                         />
//                                     </div>
//                                     <div className="fourthrow">
//                                         <div className="pcity">
//                                             <Field
//                                                 name="city"
//                                                 as={TextField}
//                                                 id="outlined-basic"
//                                                 label="City/District/Town"
//                                                 variant="outlined"
//                                                 style={{
//                                                     width: '18rem',
//                                                     marginTop: ".5rem"
//                                                 }}
//                                                 error={touched.city && !!errors.city}
//                                                 helperText={touched.city && errors.city}
//                                             />
//                                         </div>

//                                         <div className="pstate" style={{ position: 'relative' }}>
//                                             <FormControl sx={{ m: 1, minWidth: 120 }}>
//                                                 <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
//                                                 <Field
//                                                     name="state"
//                                                     as={Select}
//                                                     labelId="demo-simple-select-helper-label"
//                                                     id="demo-simple-select-helper"
//                                                     style={{
//                                                         width: '17.5rem',

//                                                     }}
//                                                     error={touched.state && !!errors.state}
//                                                 >
//                                                     <MenuItem value={"madhya Pradesh"}>Madhya Pradesh</MenuItem>
//                                                     <MenuItem value={"assam"}>Assam</MenuItem>
//                                                     <MenuItem value={'mizoram'}>Mizoram</MenuItem>
//                                                     <MenuItem value={"meghalaya"}>Meghalaya</MenuItem>
//                                                 </Field>
//                                             </FormControl>
//                                             <FormHelperText error={!!(touched.state && errors.state)} style={{ margin: '-7px 15px' }}>
//                                                 <ErrorMessage name="state" />
//                                             </FormHelperText>
//                                         </div>
//                                     </div>

//                                     <div className="fifthrow">
//                                         <div className="plandmark">
//                                             <Field
//                                                 name="landmark"
//                                                 as={TextField}
//                                                 id="outlined-basic"
//                                                 label="Landmark (Optional)"
//                                                 variant="outlined"
//                                                 style={{
//                                                     width: '18rem',
//                                                 }}
//                                             />
//                                         </div>
//                                         <div className="ppincode">
//                                             <Field
//                                                 name="pincode"
//                                                 as={TextField}
//                                                 id="outlined-number"
//                                                 label="Pincode"
//                                                 type="number"
//                                                 InputLabelProps={{
//                                                     shrink: true,
//                                                 }}
//                                                 style={{
//                                                     width: '18rem',
//                                                 }}
//                                                 error={touched.pincode && !!errors.pincode}
//                                                 helperText={touched.pincode && errors.pincode}
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="sixthhrow">
//                                         <div className="plocality">
//                                             <Field
//                                                 name="locality"
//                                                 as={TextField}
//                                                 id="outlined-basic"
//                                                 label="Locality"
//                                                 variant="outlined"
//                                                 style={{
//                                                     width: '18rem',
//                                                 }}
//                                                 error={touched.locality && !!errors.locality}
//                                                 helperText={touched.locality && errors.locality}
//                                             />
//                                         </div>
//                                         <Button
//                                             type="submit"
//                                             variant="contained"
//                                             disabled={isSubmitting}
//                                             style={{
//                                                 width: '14rem',
//                                                 height: '2.6rem',
//                                                 marginTop: "1rem",
//                                                 backgroundColor: 'green',
//                                                 color: 'white'
//                                             }}
//                                         >
//                                             Save and deliver here
//                                         </Button>
//                                         <Button
//                                             variant="outlined"
//                                             style={{
//                                                 width: '14rem',
//                                                 height: '2.6rem',
//                                                 marginTop: "1rem",
//                                                 marginLeft: "1rem",
//                                                 color: 'black'
//                                             }}
//                                             onClick={handleCancelClick}
//                                         >
//                                             Cancel
//                                         </Button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Form>
//                     )}
//                 </Formik>
//             </div>
//         </AccordionDetails>
//     </Accordion>
// )}