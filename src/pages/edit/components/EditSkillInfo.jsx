import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const EditSkillInfo = (props) => {
  const lookup = useSelector((state) => state?.lookup?.lookupData);
  // const [lookupData, setLookupData] = useState([]);

  const {
    formData = {},
    handleWizardInputChange = () => {},
    isEditableFields = false,
  } = props;

  const skillTypeLookup = lookup?.find(
    (lookup) => lookup.lookupType === "skillType"
  );
  const skillTypeLookupList = skillTypeLookup?.lookups;

  const hobbies = formData?.hobbiesRecord?.[0];

  const skillNameLookup = lookup?.find(
    (lookup) => lookup.lookupType === "nonTechnicalSkill"
  );
  const skillNameLookupList = skillNameLookup?.lookups;

  const skillNameLookup1 = lookup?.find(
    (lookup) => lookup.lookupType === "technicalSkill"
  );
  const skillNameLookupList1 = skillNameLookup1?.lookups;

  const skillLevelLookup = lookup?.find(
    (lookup) => lookup.lookupType === "skillLevel"
  );
  const skillLevelLookupList = skillLevelLookup?.lookups;

  const hobbiesLookup = lookup?.find(
    (lookup) => lookup.lookupType === "hobbies"
  );
  const hobbiesLookupList = hobbiesLookup?.lookups;

  // useEffect(() => {
  //   getAllLookupList();
  // }, []);

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

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newSkillInfo = formData?.skills.map((skillItem, skillIndex) => {
      if (skillIndex === index) {
        const newSkillItem = {
          ...skillItem,
          [name]: value,
        };
        return newSkillItem;
      }
      return skillItem;
    });
    // const newSkillInfoDetails = {
    //   ...formData?.skillInfo,
    //   skills: newSkillInfo,
    // };
    handleWizardInputChange("skills", newSkillInfo);
  };

  const handleAddMore = () => {
    const newSkillInfo = {
      notes: "",
      skillType: 0,
      skillName: 0,
      skillLevel: 0,
      skillExperienceYear: 0,
    };
    // const newSkillDetails = {
    //   ...formData?.skillInfo,
    //   skills: [formData.skillInfo.skills]
    //     ? [...formData.skillInfo.skills, newSkillInfo]
    //     : [newSkillInfo],
    // };
    formData?.skills.push(newSkillInfo);
    handleWizardInputChange("skills", formData?.skills);
  };

  const handleRemove = (index) => {
    const newSkillInfo = [...formData?.skills];
    newSkillInfo.splice(index, 1);
    // const newSkillInfoDetails = {
    //   ...formData.skillInfo,
    //   skills: newSkillInfo,
    // };
    handleWizardInputChange("skills", newSkillInfo);
  };

  // const handleChangeHobbies = (e) => {
  //   const { name, value } = e.target;
  //   const newHobbiesRecord = formData?.hobbiesRecord.map((item, index) => {
  //     const newHobbies = {
  //       ...item,
  //       [name]: value,
  //     };
  //     return newHobbies;
  //   });

  //   handleWizardInputChange("hobbiesRecord", newHobbiesRecord);
  // };

  const handleChangeHobbies = (e) => {
    const { value } = e.target;

    const hobbiesRecord = formData?.hobbiesRecord[0];

    if (hobbiesRecord) {
      // If hobbiesRecord exists, update its hobbiesName directly
      const updatedHobbiesRecord = { ...hobbiesRecord, hobbiesName: value };
      handleWizardInputChange("hobbiesRecord", [updatedHobbiesRecord]);
    } else {
      // If hobbiesRecord doesn't exist, create a new object with hobbiesType: 9 and hobbiesName: value
      const newHobbiesRecord = { hobbiesType: "9", hobbiesName: value };
      handleWizardInputChange("hobbiesRecord", [newHobbiesRecord]);
    }
  };

  return (
    <>
      {formData?.skills &&
        formData?.skills.map((skillInfoItem, index) => {
          return (
            <div key={index} className="row g-3 m-0 p-0 justify-content-center">
              <div className="d-flex">
                <div className="col-md-10">Skill - {index + 1}</div>
                <div className="me-10">
                  <Button
                    className="bg-success text-white m-2"
                    onClick={() => handleRemove(index)}
                    disabled={!isEditableFields}
                  >
                    Remove
                  </Button>
                </div>
              </div>
              <div className="border-bottom border-bottom-1 col-md-10"></div>

              <div className="col-md-5">
                <label className="form-label personal-label">Skill Type</label>
                <select
                  name="skillType"
                  className="form-select"
                  value={skillInfoItem?.skillType || ""}
                  aria-label=".form-select-lg example"
                  onChange={(e) => handleInputChange(e, index)}
                  disabled={!isEditableFields}
                >
                  <option defaultValue disabled value="">
                    Skill Type
                  </option>
                  {skillTypeLookupList?.[0] &&
                    skillTypeLookupList.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.label}
                        </option>
                      );
                    })}
                </select>
                <div className="invalid-feedback">
                  Please select Skill Type.
                </div>
              </div>

              <div className="col-md-5">
                <label className="form-label personal-label">Skill Name</label>
                <select
                  name="skillName"
                  className="form-select"
                  value={skillInfoItem?.skillName || ""}
                  aria-label=".form-select-lg example"
                  onChange={(e) => handleInputChange(e, index)}
                  disabled={!isEditableFields}
                >
                  <option defaultValue disabled value="">
                    Skill Name
                  </option>
                  {skillInfoItem?.skillType === "8"
                    ? skillNameLookupList1?.[0] &&
                      skillNameLookupList1.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.label}
                          </option>
                        );
                      })
                    : skillNameLookupList?.[0] &&
                      skillNameLookupList.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.label}
                          </option>
                        );
                      })}
                </select>
                <div className="invalid-feedback">
                  Please select Skill Name.
                </div>
              </div>

              <div className="col-md-5">
                <label className="form-label personal-label">Skill Level</label>
                <select
                  name="skillLevel"
                  className="form-select"
                  value={skillInfoItem?.skillLevel || ""}
                  aria-label=".form-select-lg example"
                  onChange={(e) => handleInputChange(e, index)}
                  disabled={!isEditableFields}
                >
                  <option defaultValue disabled value="">
                    Skill Level
                  </option>
                  {skillLevelLookupList?.[0] &&
                    skillLevelLookupList.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.label}
                        </option>
                      );
                    })}
                </select>
                <div className="invalid-feedback">
                  Please select Skill Level.
                </div>
              </div>

              <div className="col-md-5">
                <label className="form-label personal-label">
                  Skill Experience
                </label>
                <input
                  type="text"
                  name="skillExperienceYear"
                  value={skillInfoItem?.skillExperienceYear || ""}
                  className="form-control"
                  placeholder="e.g. 1-12"
                  onChange={(e) => handleInputChange(e, index)}
                  disabled={!isEditableFields}
                />
              </div>

              <div className="col-md-5" style={{ marginRight: 640 }}>
                <label className="form-label personal-label col-md-10">
                  Skill Detail
                </label>
                <textarea
                  name="notes"
                  rows="2"
                  cols="80"
                  value={skillInfoItem?.notes || ""}
                  placeholder="e.g. About Skill..."
                  onChange={(e) => handleInputChange(e, index)}
                  disabled={!isEditableFields}
                />
              </div>
            </div>
          );
        })}

      <div className="text-start col-md-5 m-5">
        <Button
          className="bg-success text-white"
          onClick={() => handleAddMore()}
        >
          Add More
        </Button>
      </div>

      <div
        style={{ marginLeft: 130 }}
        className="border-bottom border-bottom-1 col-md-10"
      ></div>

      <div className="col-md-5" style={{ marginLeft: 130 }}>
        <label className="form-label personal-label">Hobbies</label>
        <select
          name="hobbiesName"
          className="form-select"
          value={hobbies?.hobbiesName || ""}
          aria-label=".form-select-lg example"
          onChange={(e) => handleChangeHobbies(e)}
          disabled={!isEditableFields}
        >
          <option defaultValue disabled value="">
            Hobbies
          </option>
          {hobbiesLookupList?.[0] &&
            hobbiesLookupList.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.label}
                </option>
              );
            })}
        </select>
        <div className="invalid-feedback">Please select Hobbies.</div>
      </div>
    </>
  );
};

export default EditSkillInfo;
