import { useSelector } from "react-redux";

const EditEmployeePersonalDetails = (props) => {
  const lookup = useSelector((state) => state?.lookup?.lookupData);

  // const [lookupData, setLookupData] = useState([]);
  const {
    formData = {},
    formValidationError = {},
    handleWizardInputChange = () => {},
    isEditableFields = false,
    isShowError = false,
  } = props;
  const personalDetails = formData?.personalDetails || {};
  const personalDetailsError = formValidationError?.personalDetails || {};

  const titleLookup = lookup?.find((lookup) => lookup.lookupType === "title");
  const titleLookupList = titleLookup?.lookups;

  const genderLookup = lookup?.find((lookup) => lookup.lookupType === "gender");
  const genderLookupList = genderLookup?.lookups;

  const bloodGroupLookup = lookup?.find(
    (lookup) => lookup.lookupType === "bloodGroup"
  );
  const bloodGroupLookupList = bloodGroupLookup?.lookups;

  const marriedStatusLookup = lookup?.find(
    (lookup) => lookup?.lookupType === "marriedStatus"
  );
  const marriedStatusLookupList = marriedStatusLookup?.lookups;

  // useEffect(() => {
  //   getAllLookupList();
  // }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newPersonalDetail = {
      ...personalDetails,
      [name]: value,
    };

    handleWizardInputChange("personalDetails", newPersonalDetail);
  };

  // const getAllLookupList = async () => {
  //   try {
  //     const responseData = await fetchInterceptor(
  //       API_ROUTES_PATH.GET_ALL_LOOKUP_LIST,
  //       {
  //         method: "GET",
  //       }
  //     );
  //     const lookupData = responseData.lookupData;
  //     setLookupData(lookupData);
  //   } catch (error) {}
  // };

  const isoDateString = personalDetails?.dob;
  const formattedDate = isoDateString?.split("T")[0];

  return (
    <>
      <div className="row g-3 m-0 p-0">
        <div className="col-md-2">
          <label className="form-label personal-label">
            Title<span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="title"
            className={`form-control ${
              isShowError && personalDetailsError?.title ? "is-invalid" : ""
            }`}
            aria-label=".form-select-lg example"
            value={personalDetails?.title}
            onChange={handleInputChange}
            required
            disabled={!isEditableFields}
          >
            <option defaultValue disabled value="">
              Title
            </option>
            {titleLookupList?.[0] &&
              titleLookupList.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.label}
                  </option>
                );
              })}
          </select>
          {isShowError && personalDetailsError?.title && (
            <div className="invalid-feedback">
              {personalDetailsError?.title}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            First Name<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="firstName"
            className={`form-control ${
              isShowError && personalDetailsError?.firstName ? "is-invalid" : ""
            }`}
            placeholder="e.g. Pooja"
            value={personalDetails?.firstName || ""}
            onChange={handleInputChange}
            required
            disabled={!isEditableFields}
          />
          {isShowError && personalDetailsError?.firstName && (
            <div className="invalid-feedback">
              {personalDetailsError?.firstName}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Middle Name<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="middleName"
            className={
              "form-control" +
              (isShowError && personalDetailsError?.middleName
                ? " is-invalid"
                : "")
            }
            placeholder="e.g. Devidas"
            value={personalDetails?.middleName || ""}
            onChange={handleInputChange}
            disabled={!isEditableFields}
          />
          {isShowError && personalDetailsError?.middleName && (
            <div className="invalid-feedback">
              {personalDetailsError?.middleName}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Last Name<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="lastName"
            className={
              "form-control" +
              (isShowError && personalDetailsError?.lastName
                ? " is-invalid"
                : "")
            }
            placeholder="e.g. Mane"
            value={personalDetails?.lastName || ""}
            onChange={handleInputChange}
            required
            disabled={!isEditableFields}
          />
          {isShowError && personalDetailsError?.lastName && (
            <div className="invalid-feedback">
              {personalDetailsError?.lastName}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Maiden Name
          </label>
          <input
            type="text"
            name="maidenName"
            className={"form-control"}
            placeholder="e.g. Mane"
            value={personalDetails?.maidenName || ""}
            onChange={handleInputChange}
            required
            disabled={!isEditableFields}
          />
          {/* {isShowError && personalDetailsError?.maidenName && (
            <div className="invalid-feedback">
              {personalDetailsError?.maidenName}
            </div>
          )} */}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Gender<span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="gender"
            className={
              "form-control" +
              (isShowError && personalDetailsError?.gender ? " is-invalid" : "")
            }
            aria-label=".form-select-lg example"
            value={personalDetails?.gender || ""}
            onChange={handleInputChange}
            required
            disabled={!isEditableFields}
          >
            <option defaultValue disabled value="">
              Gender
            </option>
            {genderLookupList?.[0] &&
              genderLookupList.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.label}
                  </option>
                );
              })}
          </select>
          {isShowError && personalDetailsError?.gender && (
            <div className="invalid-feedback">
              {personalDetailsError?.gender}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Date Of Birth<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="date"
            name="dob"
            className={
              "form-control" +
              (isShowError && personalDetailsError?.dob ? "is-invalid" : "")
            }
            value={formattedDate || ""}
            onChange={handleInputChange}
            required
            disabled={!isEditableFields}
          />
          {isShowError && personalDetailsError?.dob && (
            <div className="invalid-feedback">{personalDetailsError?.dob}</div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Blood Group<span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="bloodGroup"
            className={
              "form-control" +
              (isShowError && personalDetailsError?.bloodGroup
                ? "is-invalid"
                : "")
            }
            aria-label=".form-select-lg example"
            value={personalDetails?.bloodGroup || ""}
            onChange={handleInputChange}
            required
            disabled={!isEditableFields}
          >
            <option defaultValue disabled value="">
              Blood Group
            </option>
            {bloodGroupLookupList?.[0] &&
              bloodGroupLookupList.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.label}
                  </option>
                );
              })}
          </select>
          {isShowError && personalDetailsError?.dob && (
            <div className="invalid-feedback">{personalDetailsError?.dob}</div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Married Status<span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="marriedStatus"
            className={
              "form-control" +
              (isShowError && personalDetailsError?.marriedStatus
                ? " is-invalid"
                : "")
            }
            aria-label=".form-select-lg example"
            value={personalDetails?.marriedStatus || ""}
            onChange={handleInputChange}
            required
            disabled={!isEditableFields}
          >
            <option defaultValue disabled value="">
              Married Status
            </option>
            {marriedStatusLookupList?.[0] &&
              marriedStatusLookupList.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.label}
                  </option>
                );
              })}
          </select>
          {isShowError && personalDetailsError?.marriedStatus && (
            <div className="invalid-feedback">
              {personalDetailsError?.marriedStatus}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            PAN No.<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="pan"
            className={
              "form-control" +
              (isShowError && personalDetailsError?.pan ? " is-invalid" : "")
            }
            placeholder="e.g. ABC123"
            value={personalDetails?.pan || ""}
            onChange={handleInputChange}
            required
            disabled={!isEditableFields}
          />
          {isShowError && personalDetailsError?.pan && (
            <div className="invalid-feedback">{personalDetailsError?.pan}</div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Adhar No.<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="aadhar"
            className={
              "form-control" +
              (isShowError && personalDetailsError?.aadhar ? " is-invalid" : "")
            }
            placeholder="e.g. 111222333"
            value={personalDetails?.aadhar || ""}
            onChange={handleInputChange}
            required
            disabled={!isEditableFields}
          />
          {isShowError && personalDetailsError?.aadhar && (
            <div className="invalid-feedback">
              {personalDetailsError?.aadhar}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditEmployeePersonalDetails;
