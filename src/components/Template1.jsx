
import "../styles/Template1.css";



function Template({ details }) {

    let personals = details["personal_info"];
    let summary = details["summary"];
    let education = details["education"];
    let experience = details["experience"];
    let softSkills = details["skills"]["soft"];
    let techSkills = details["skills"]["technical"];
    let certifications = details["certifications"];

    return (
        <div className="template">

            <div className="header p-20">
                <div className="name">{personals["name"]}</div>
                <div><span className="bold">Email:</span> {personals["email"]}</div>
                <div><span className="bold">Contact Number:</span> {personals["phone"]}</div>
                <a href={personals["linkedin"]}>{personals["linkedin"]}</a>
            </div>

            <div className="summary p-20">{summary}</div>

            {(experience.length > 0) && (
                <div className="experience-section">
                    <h3 className="p-20">Experience:</h3>
                    <hr className="hr" />
                    {experience.map((detail) => <Experience key={detail["id"]} detail={detail} />)}
                </div>
            )}


            {(education.length > 0) && (
                <div className="education-section">
                    <h3 className="p-20">Education:</h3>
                    <hr className="hr" />
                    {education.map((detail) => <Education key={detail["id"]} detail={detail} />)}
                </div>
            )}


            {((techSkills.length > 0) && (techSkills[0] !== "")) && (
                <div className="skills-section mt-10">
                    <h3 className="p-20">Technical Skills:</h3>
                    <hr className="hr" />
                    <Skills skills={techSkills} clsName="w-30"/>
                </div>
            )}

            {((softSkills.length > 0) && (softSkills[0] !== "")) && (
                <div className="skills-section mt-10">
                    <h3 className="p-20">Soft Skills:</h3>
                    <hr className="hr" />
                    <Skills skills={softSkills}/>
                </div>
            )}

            {(certifications.length > 0) && (
                <div className="certifications-section">
                    <h3 className="p-20">Certifications:</h3>
                    <hr className="hr" />
                    <ul>
                        {certifications.map((detail) => <Certificate key={detail["id"]} detail={detail} />)}
                    </ul>
                </div>
            )}

        </div>
    );
}

function Education({ detail }) {

    return (
        <div className="education p-20">
            <div>
                <span className="bold">{detail["course"]}</span>, {detail["duration"]}
            </div>
            <div>
                <span className="bold">{detail["institution"]}</span>, {detail["location"]}
            </div>
            <div>
                <span className="bold">CourseWork: </span>{detail["coursework"].join(", ")}
            </div>
        </div>
    );
}


function Experience({ detail }) {

    return (
        <div className="experience p-20">
            <div>
                <span className="bold">{detail["role"]}</span>, {detail["duration"]}
            </div>
            <div>
                <span className="bold">{detail["organization"]}</span>
            </div>
            <div>
                <span className="bold">Responsibilities: </span>
                {(detail["responsibilities"].length > 0) && (
                    <ul>
                        {detail["responsibilities"].map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                )}
            </div>
        </div>
    );
}

function Skills({ skills, clsName = "w-50" }) {

    return (
        <ul className="skills">
            {skills.map((skill, index) => <li className={clsName} key={index}>{skill}</li>)}
        </ul>
    );
}


function Certificate({detail}) {

    return (
        <li className="certificate">
            <div>
                <span className="bold">{detail["name"]}</span>
                <span>{detail["year"]}</span>
            </div>
            <div className="bold">{detail["provider"]}</div>
        </li>
    );
}



export default Template;