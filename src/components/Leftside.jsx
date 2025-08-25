
import { use } from "react";
import "../styles/Leftside.css";


function Leftside({ userDetails, setDetails }) {

    let personalInfo = userDetails["personal_info"];
    let resumeSummary = userDetails["summary"];
    let educationDetails = userDetails["education"];
    let experienceDetails = userDetails["experience"];
    let softSkills = userDetails["skills"]["soft"].join(",");
    let techSkills = userDetails["skills"]["technical"].join(",");
    let certifications = userDetails["certifications"];


    const handleChange = ( event) => {
        if (name === "summary") {
            setDetails(prevDetails => {
                return { ...prevDetails, "summary": event.target.value };
            })
            return;
        }
        setDetails(prevDetails => {
            let newPersonals = { ...prevDetails["personal_info"] };
            newPersonals[event.target.name] = event.target.value;
            return { ...prevDetails, "personal_info": newPersonals };
        })
    }


    return (
        <aside className="leftside">

            <div className="logo-container">
                <div className="logo">QuickResume</div>
            </div>

            <div className="main-content">

                <SectionHeading title="Personal Details" />

                <Input type="text" id="name" label="Full Name" name="name" value={personalInfo["name"]} handleChange={handleChange} />

                <Input id="email" label="E-mail" type="email" name="email" value={personalInfo["email"]} handleChange={handleChange} />

                <Input id="phone-no" label="Phone Number" type="tel" name="phone" value={personalInfo["phone"]} handleChange={handleChange} />

                <Input id="linkedin" label="LinkedIn (if any)" type="url" name="linkedin" value={personalInfo["linkedin"]} handleChange={handleChange} />

                <Input id="summary" label="About Me" type="textarea" name="summary" value={resumeSummary} handleChange={handleChange} />

                <EducationSection educationDetails={educationDetails} setDetails={setDetails} />

                <ExperienceSection experienceDetails={experienceDetails} setDetails={setDetails}/>

                <Skills sectionName="Skills" details={softSkills} setDetails={setDetails} />

                <Skills sectionName="Technical Skills" details={techSkills} setDetails={setDetails} />

                <Certificates details={certifications} setDetails={setDetails}/>

            </div>

        </aside>
    );
}


function SectionHeading({ title, button = false, setDetails }) {

    const handleAdd = () => {

        if (title.toLowerCase().includes("education")) {
            setDetails((prevDetails) => {
                let newEducation = [...prevDetails["education"]];
                newEducation.push({"id": crypto.randomUUID(), "course": "", "institution": "", "location": "", "duration": "", "coursework": []});
                let newDetails = { ...prevDetails, "education": newEducation };
                return newDetails;
            })
        }

        if (title.toLowerCase().includes("experiences")) {
            setDetails((prevDetails) => {
                let newExperience = [...prevDetails["experience"]];
                newExperience.push({"id": crypto.randomUUID(), "role": "", "organization": "", "duration": "", "responsibilities": []});
                let newDetails = { ...prevDetails, "experience": newExperience };
                return newDetails;
            })
        }

        if (title.toLowerCase().includes("certificates")) {
            setDetails((prevDetails) => {
                let newCertificate = [...prevDetails["certifications"]];
                newCertificate.push({"id": crypto.randomUUID(), "name": "", "provider": "", "year": ""});
                return { ...prevDetails, "certifications": newCertificate };
            })
        }
    }

    return (
        <div className="section-heading">
            <h2>{title}</h2>
            {(button ?
                (
                    <button onClick={handleAdd}>+</button>
                )
                : null
            )}
        </div>
    );
}


function SubHeading({ id, title, setDetails }) {

    const handleDelete = () => {
        if (title.toLowerCase().includes("education")) {
            setDetails((prevDetails) => {
                let newEducation = prevDetails["education"].filter(edu => edu["id"] != id);
                return { ...prevDetails, "education": newEducation };
            })
        }

        if (title.toLowerCase().includes("experience")) {
            setDetails((prevDetails) => {
                let newExperience = prevDetails["experience"].filter(exp => exp["id"] != id);
                return { ...prevDetails, "experience": newExperience };
            })
        }

        if (title.toLowerCase().includes("certificate")) {
            setDetails((prevDetails) => {
                let newCertificate = prevDetails["certifications"].filter(exp => exp["id"] != id);
                return { ...prevDetails, "certifications": newCertificate };
            })
        }
    }

    return (
        <div className="heading">
            <h3> {title}: </h3>
            <button onClick={() => handleDelete()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        d="M6 7h12M10 11v6M14 11v6M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
}


function Input({ id, label, type = "text", name, info, value, handleChange }) {

    return (
        <div className="input-row">

            <label htmlFor={id}>
                {label}:
                {(info) && (
                    <p>{info}</p>
                )}
            </label>

            {(type === "textarea") ? (
                <textarea name={name} id={id} cols="50" rows="5" value={value} onChange={(event) => { handleChange(event) }}></textarea>
            ) : (
                <input type={type} name={name} id={id} value={value} onChange={(event) => { handleChange(event) }} />
            )}

        </div>
    );
}


function EducationSection({ educationDetails, setDetails }) {

    return (
        <section className="education-section">
            <SectionHeading title="Education Details" button={true} setDetails={setDetails} />

            {educationDetails.map(detail => <Education key={detail.id} eduId={detail.id} educationDetails={detail} setDetails={setDetails} />)}
        </section>
    );
}


function Education({ eduId, educationDetails, setDetails }) {

    const handleChange = (event) => {
        
        setDetails((prevDetails) => {
            let newEducation = [...prevDetails["education"]];
            newEducation.map(edu => {
                if (edu["id"] === eduId) {
                    if (event.target.name === "coursework") {
                        edu[event.target.name] = event.target.value.split(",");
                        return
                    }
                    edu[event.target.name] = event.target.value;
                    return
                }
            });
            return {...prevDetails, "education": newEducation}
        })
    }

    return (
        <div className="education">
            <SubHeading id={eduId} title="Education" setDetails={setDetails} />

            <Input id="institute" label="Institute" type="text" name="institution" value={educationDetails["institution"]} handleChange={handleChange} />
            <Input id="institute-city" label="City" type="text" name="location" value={educationDetails["location"]} handleChange={handleChange} />
            <Input id="course" label="Course" type="text" name="course" value={educationDetails["course"]} handleChange={handleChange} />
            <Input id="duration" label="Duration" type="text" name="duration" value={educationDetails["duration"]} handleChange={handleChange} />
            <Input id="coursework" label="CourseWork (mention few lines if want)" type="textarea" name="coursework" info="Use ',' to seperate the key points" value={educationDetails["coursework"]} handleChange={handleChange} />
        </div>
    );
}


function ExperienceSection({experienceDetails, setDetails}) {

    return (
        <section className="experience-section">
            <SectionHeading title="Work Experiences" button={true} setDetails={setDetails}/>

            {experienceDetails.map(detail => <Experience key={detail.id} expId={detail.id} experienceDetail={detail} setDetails={setDetails} />)}


            {/* <Experience /> */}
        </section>
    );
}


function Experience({expId, experienceDetail, setDetails}) {

    const handleChange = (event) => {
        
        setDetails((prevDetails) => {
            let newExperience = [...prevDetails["experience"]];
            newExperience.map(exp => {
                if (exp["id"] === expId) {
                    if (event.target.name === "responsibilities") {
                        exp[event.target.name] = event.target.value.split(",");
                        return
                    }
                    exp[event.target.name] = event.target.value;
                    return
                }
            });
            return {...prevDetails, "experience": newExperience}
        })
    }

    return (
        <div className="education">
            <SubHeading id={expId} title="Experience" setDetails={setDetails} />

            <Input id="role" label="Role" type="text" name="role" value={experienceDetail["role"]} handleChange={handleChange} />
            <Input id="organization" label="Organization" type="text" name="organization" value={experienceDetail["organization"]} handleChange={handleChange} />
            <Input id="work-duration" label="Duration" type="text" name="duration" value={experienceDetail["duration"]} handleChange={handleChange} />
            <Input id="responsibilities" label="Responsibilities" type="textarea" name="responsibilities" info="Use ',' to seperate the key points" value={experienceDetail["responsibilities"]} handleChange={handleChange} />
        </div>
    );
}


function Skills({ sectionName, details, setDetails }) {

    const handleChange = (event) => {
        setDetails((prevDetails) => {
            let newSkills = event.target.value.split(",")
            if (event.target.name === "skills") {
                return {...prevDetails, "skills": {...prevDetails["skills"], "soft": newSkills}}
            }
            return {...prevDetails, "skills": {...prevDetails["skills"], "technical": newSkills}}
        })
    }

    return (
        <section className="skills-section">

            <SectionHeading title={sectionName} />
            <Input id={sectionName.toLowerCase()} label={sectionName} type="textarea" name={sectionName.toLowerCase()} info="Use ',' to seperate the key points" value={details} handleChange={handleChange} />

        </section>
    );
}


function Certificates({details, setDetails}) {

    return (
        <section className="certificates">

            <SectionHeading title="Certificates" button={true} setDetails={setDetails} />

            {details.map(detail => <Certificate key={detail.id} cId={detail.id} detail={detail} setDetails={setDetails} />)}

        </section>
    );
}

function Certificate({cId, detail, setDetails}) {

    const handleChange = (event) => {
        
        setDetails((prevDetails) => {
            let newCertificate = [...prevDetails["certifications"]];
            newCertificate.map(certificate => {
                if (certificate["id"] === cId) {
                    certificate[event.target.name] = event.target.value;
                    return
                }
            });
            return {...prevDetails, "ccertifications": newCertificate}
        })
    }

    return (
        <div>

            <SubHeading id={cId} title="Certificate" setDetails={setDetails} />

            <Input id="name" label="Name" type="text" name="name" value={detail["name"]} handleChange={handleChange} />
            <Input id="provider" label="Provider" type="text" name="provider" value={detail["provider"]} handleChange={handleChange} />
            <Input id="year" label="Year" type="text" name="year" value={detail["year"]} handleChange={handleChange} />

        </div>
    );
}






export default Leftside;