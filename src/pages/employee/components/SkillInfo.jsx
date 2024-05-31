import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { API_ROUTES_PATH } from "../../../helper/Constants";

const SkillInfo = (props) => {
  const [lookupData, setLookupData] = useState([]);
  const { formData = {}, handleWizardInputChange = () => {} } = props;

  const skillTypeLookup = lookupData?.find(
    (lookup) => lookup.lookupType === "skillType"
  );
  const skillTypeLookupList = skillTypeLookup?.lookups;

  const skillInfoDetails = formData?.skillInfo?.skills;

  const skillNameLookup = lookupData?.find(
    (lookup) => lookup.lookupType === "nonTechnicalSkill"
  );
  const skillNameLookupList = skillNameLookup?.lookups;

  const skillNameLookup1 = lookupData?.find(
    (lookup) => lookup.lookupType === "technicalSkill"
  );

  const skillNameLookupList1 = skillNameLookup1?.lookups;

  const skillLevelLookup = lookupData?.find(
    (lookup) => lookup.lookupType === "skillLevel"
  );
  const skillLevelLookupList = skillLevelLookup?.lookups;

  const hobbies = formData?.skillInfo?.hobbiesRecord?.[0];

  const hobbiesLookup = lookupData?.find(
    (lookup) => lookup.lookupType === "hobbies"
  );
  const hobbiesLookupList = hobbiesLookup?.lookups;

  useEffect(() => {
    getAllLookupList();
  }, []);

  const getAllLookupList = async () => {
    try {
      const response = await fetch(API_ROUTES_PATH.GET_ALL_LOOKUP_LIST, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Response not ok. ");
      }
      const responseData = await response.json();
      const lookupData = responseData.lookupData;
      setLookupData(lookupData);
    } catch (error) {}
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newSkillInfo = skillInfoDetails.map((skillItem, skillIndex) => {
      if (skillIndex === index) {
        const newSkillItem = {
          ...skillItem,
          [name]: value,
        };
        return newSkillItem;
      }
      return skillItem;
    });
    const newSkillInfoDetails = {
      ...formData?.skillInfo,
      skills: newSkillInfo,
    };
    handleWizardInputChange("skillInfo", newSkillInfoDetails);
  };

  const handleAddMore = () => {
    const newSkillInfo = {
      notes: "",
      skillType: 0,
      skillName: 0,
      skillLevel: 0,
      skillExperienceYear: 0,
    };
    const newSkillDetails = {
      ...formData?.skillInfo,
      skills: [formData.skillInfo.skills]
        ? [...formData.skillInfo.skills, newSkillInfo]
        : [newSkillInfo],
    };
    handleWizardInputChange("skillInfo", newSkillDetails);
  };

  const handleRemove = (index) => {
    const newSkillInfo = [...formData.skillInfo.skills];
    newSkillInfo.splice(index, 1);
    const newSkillInfoDetails = {
      ...formData.skillInfo,
      skills: newSkillInfo,
    };
    handleWizardInputChange("skillInfo", newSkillInfoDetails);
  };

  const handleChangeHobbies = (e) => {
    const { name, value } = e.target;
    const newHobbiesRecord = formData?.skillInfo?.hobbiesRecord.map(
      (item, index) => {
        const newHobbies = {
          ...item,
          [name]: value,
        };
        return newHobbies;
      }
    );
    const newHobbiesRecordDetails = {
      ...formData?.skillInfo,
      hobbiesRecord: newHobbiesRecord,
    };
    handleWizardInputChange("skillInfo", newHobbiesRecordDetails);
  };

  return (
    <>
      {formData?.skillInfo?.skills &&
        formData?.skillInfo?.skills.map((skillInfoItem, index) => {
          return (
            <div key={index}>
              <div className="row g-3 m-0 p-0 justify-content-center">
                <div className="d-flex">
                  <div className="col-md-10">Skill - {index + 1}</div>
                  <div className="me-10">
                    <Button
                      className="bg-success text-white m-2"
                      onClick={() => handleRemove(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="border-bottom border-bottom-1 col-md-10"></div>

                <div className="col-md-5">
                  <label className="form-label personal-label">
                    Skill Type
                  </label>
                  <select
                    name="skillType"
                    className="form-select"
                    value={skillInfoItem?.skillType || ""}
                    aria-label=".form-select-lg example"
                    onChange={(e) => handleInputChange(e, index)}
                  >
                    <option defaultValue disabled value="">
                      Skill Type
                    </option>
                    {skillTypeLookupList &&
                      skillTypeLookupList?.map((item, index) => {
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
                  <label className="form-label personal-label">
                    Skill Name
                  </label>
                  <select
                    name="skillName"
                    className="form-select"
                    value={skillInfoItem?.skillName || ""}
                    aria-label=".form-select-lg example"
                    onChange={(e) => handleInputChange(e, index)}
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
                  <label className="form-label personal-label">
                    Skill Level
                  </label>
                  <select
                    name="skillLevel"
                    className="form-select"
                    value={skillInfoItem?.skillLevel || ""}
                    aria-label=".form-select-lg example"
                    onChange={(e) => handleInputChange(e, index)}
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
                  />
                </div>
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
        className="border-bottom border-bottom-1 col-md-10 m-3"
      ></div>

      <div className="col-md-5" style={{ marginLeft: 130 }}>
        <label className="form-label personal-label">Hobbies</label>
        <select
          name="hobbiesName"
          className="form-select"
          value={hobbies?.hobbiesName || ""}
          aria-label=".form-select-lg example"
          onChange={(e) => handleChangeHobbies(e)}
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

export default SkillInfo;
