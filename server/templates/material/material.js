function material(data) {
  const temp = `
  <!doctype html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Resume</title>
            <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'>
            <style>
            * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
       }
        html {
            height: 100%;
       }
        body {
            min-height: 100%;
            background: #eee;
            font-family: 'Lato', sans-serif;
            font-weight: 400;
            color: #222;
            font-size: 14px;
            line-height: 26px;
            padding-bottom: 50px;
       }
        .container {
            max-width: 700px;
            background: #fff;
            margin: 0px auto 0px;
            box-shadow: 1px 1px 2px #dad7d7;
            border-radius: 3px;
            padding: 40px;
            margin-top: 50px;
       }
        .header {
            margin-bottom: 30px;
       }
        .header .full-name {
            font-size: 40px;
            text-transform: uppercase;
            margin-bottom: 5px;
       }
        .header .first-name {
            font-weight: 700;
       }
        .header .last-name {
            font-weight: 300;
       }
        .header .contact-info {
            margin-bottom: 20px;
       }
        .header .email, .header .phone {
            color: #999;
            font-weight: 300;
       }
        .header .separator {
            height: 10px;
            display: inline-block;
            border-left: 2px solid #999;
            margin: 0px 10px;
       }
        .header .position {
            font-weight: bold;
            display: inline-block;
            margin-right: 10px;
            text-decoration: underline;
       }
        .details {
            line-height: 20px;
       }
        .details .section {
            margin-bottom: 40px;
       }
        .details .section:last-of-type {
            margin-bottom: 0px;
       }
        .details .section__title {
            letter-spacing: 2px;
            color: #54afe4;
            font-weight: bold;
            margin-bottom: 10px;
            text-transform: uppercase;
       }
        .details .section__list-item {
            margin-bottom: 40px;
       }
        .details .section__list-item:last-of-type {
            margin-bottom: 0;
       }
        .details .left, .details .right {
            vertical-align: top;
            display: inline-block;
       }
        .details .left {
            width: 60%;
       }
        .details .right {
            text-align: right;
            width: 39%;
       }
        .details .name {
            font-weight: bold;
       }
        .details a {
            text-decoration: none;
            color: #000;
            font-style: italic;
       }
        .details a:hover {
            text-decoration: underline;
            color: #000;
       }
        .details .skills__item {
            margin-bottom: 10px;
       }
        .details .skills__item .right input {
            display: none;
       }
        .details .skills__item .right label {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: #c3def3;
            border-radius: 20px;
            margin-right: 3px;
       }
        .details .skills__item .right input:checked + label {
            background: #79a9ce;
       }
            </style>
        </head>
        <body>
        <div class="container">
        <div class="header">
          <div class="full-name">
            <span class="first-name">${data.fname}</span> 
            <span class="last-name">${data.lname}</span>
          </div>
          ${
            data.links.length > 0 &&
            `<div class="contact-info">
            ${data.links
              .map(
                (link) =>
                  `<span class="email-val">${link}</span>
                   <span class="separator"></span>`
                )
              .join("")}
          </div>`
          }
        </div>
         <div class="details">
         ${
           data.experience.length > 0 &&
           `<div class="section">
            <div class="section__title">Experience</div>
            <div class="section__list">
            ${data.experience
              .map(
                (exp) =>
              `<div class="section__list-item">
                <div class="left">
                  <div class="name">${exp.company}</div>
                  <div class="addr">${exp.location}</div>
                  <div class="duration">${exp.start} - ${exp.end}</div>
                </div>
                <div class="right">
                  <div class="name">${exp.role}</div>
                  <div class="desc">${exp.description}</div>
                </div>
              </div>`
              )
              .join("")}
            </div>
          </div>`
         }
          ${
            data.education.length > 0 &&
            `<div class="section">
            <div class="section__title">Education</div>
            <div class="section__list">
            ${data.education
              .map(
                (edu) =>
                  `
              <div class="section__list-item">
                <div class="left">
                  <div class="name">${edu.college}</div>
                  <div class="addr">${edu.location}</div>
                  <div class="duration">${edu.start} - ${edu.end}</div>
                </div>
                <div class="right">
                  <div class="name">${edu.degree}</div>
                  <div class="desc">${edu.grade}</div>
                </div>
              </div>
            `
              )
              .join("")}
              </div>
        </div>`
          }
        ${
          data.projects.length > 0 &&
          `<div class="section">
            <div class="section__title">Projects</div> 
             <div class="section__list">
             ${data.projects
               .map(
                 (proj) =>
                   `<div class="section__list-item">
                 <div class="name">${proj.name}</div>
                 <a class="text">${proj.link}</a>
                 <div class="text">${proj.description}</div>
               </div>
               `
               )
               .join("")}
             </div>
          </div>
          `
        }
            ${
              data.skills.length > 0 &&
              `<div class="section">
             <div class="section__title">Skills</div>
             <div class="skills">
                ${data.skills
                  .map(
                    (skill) =>
                      `<div class="skills__item">
                        <div class="left">  
                          <div class="name">
                            ${skill}
                          </div>
                        </div>
                      </div>`
                  )
                  .join("")}      
             </div>
             </div>
             `
            }
            ${
              data.interests.length > 0 &&
              `<div class="section">
           <div class="section__title">
             Interests
             </div>
             <div class="section__list">
                ${data.interests
                  .map(
                    (interest) =>
                      `<div class="section__list-item">
                        ${interest}
                </div>`
                  )
                  .join("")}
             </div>
           </div>
           `
            }
           </div>
        </div>
      </div>
        </body>
    </html>        
  `;
  return temp;
}

module.exports = material;
