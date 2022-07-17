function minimal(data) {
  const temp = `
    <!doctype html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Resume</title>
            <link href="https://fonts.googleapis.com/css?family=Merriweather:300,400,700|Source+Sans+Pro:400,400i" rel="stylesheet">
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #fff;
                    font-size: 12px;
                    font-family: 'Source Sans Pro', sans-serif;
                    -webkit-font-smoothing: subpixel-antialiased;
                }
                
                * {
                    box-sizing: border-box;
                    -moz-box-sizing: border-box;
                }
                
                /*
                Primary Rules
                */
                h1 {
                    font-weight: 300;
                    margin: 5px 0 0;
                    font-size: 40px;
                    color: #ba0018;
                    padding: 0 10px 10px;
                    border-radius: 2px;
                    font-family: 'Merriweather', serif;
                }
                
                h2 {
                    color: #ba0018;
                    width: 150px;
                    font-size: 18px;
                    padding-left: 20px;
                    padding-top: 12px;
                    font-weight: 700;
                    font-family: 'Merriweather', serif;
                }
                
                h3 {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 0;
                    line-height: 28px;
                    font-family: 'Merriweather', serif;
                }
                
                h2,
                h3 {
                    margin-top: 5px
                }
                
                a {
                    color: #ba0018;
                    display: inline-block;
                    text-decoration: none;
                    padding: 2px 4px;
                    border-radius: 2px;
                    margin-right: -2px;
                }
                
                a:hover {
                    background-color: #ba0018;
                    color: #fff;
                }
                
                .key:first-child {
                    margin-left: 0
                }
                
                .key {
                    margin: 0 10px;
                    position: relative;
                }
                
                .key::before {
                    content: '◆';
                    position: absolute;
                    left: -15px;
                    color: #555;
                    font-size: 7pt;
                }
                
                .key:first-child::before {
                    content: ''
                }
                
                .section {
                    border-bottom: 1px solid #ddd;
                    padding: 10px 0 15px;
                }
                
                .section:last-child {
                    border: none
                }
                
                .section-text {
                    width: 80%;
                    font-size: 18px;
                    line-height: 24px;
                    margin: 10px 0 10px;
                    padding: 0 10px;
                }
                
                .subsection {
                    margin: 10px 0 5px
                }
                
                .desc {
                    font-size: 16px;
                    font-family: 'Source Sans Pro', sans-serif;
                    color: #444;
                }
                
                .contact-info {
                    font-size: 16px;
                    text-align: right;
                }
                
                .light {
                    color: #aaa;
                    letter-spacing: 1px;
                    font-size: 14px;
                    line-height: 28px;
                    font-family: 'Source Sans Pro', sans-serif;
                    text-transform: uppercase;
                }
                
                ul {
                    padding-left: 15px;
                }
                
                ul.skills {
                    float: left;
                    width: 30%;
                    padding-left: 0px;
                    margin: 0 20px 0 0;
                }
                
                ul.skills li {
                    list-style: none;
                    font-size: 16px;
                    margin-bottom: 10px;
                }
                
                ul.skills li:last-child {
                    margin: 0;
                }
                
                /*
                Float Rules
                */
                .row:before,
                .row:after {
                    content: "";
                    display: table;
                }
                
                .row:after {
                    clear: both
                }
                
                .col {
                    float: left
                }
                
                .col-right {
                    float: right
                }
                
                /*
                Page Rules
                */
                .page {
                    width: 1000px;
                    min-height: 29.7cm;
                    margin: 1cm auto;
                
                    background: white;
                    padding: 20px 50px;
                }
                
                .subpage {
                    padding: 1cm;
                    border: 1px red solid;
                    height: 297mm;
                }
                
                @page {
                    size: A4;
                    margin: 0;
                }
                
                @media print {
                    .page {
                        margin: 0;
                        border: initial;
                        border-radius: initial;
                        width: initial;
                        min-height: initial;
                        box-shadow: initial;
                        background: initial;
                        page-break-after: always;
                    }
                
                    .page-break {
                        page-break-before: always;
                        padding-top: 30px;
                    }
                
                    body {
                        font-size: 12pt;
                    }
                
                    h1 {
                        font-size: 23pt;
                    }
                
                    h2 {
                        font-size: 10pt;
                        width: 3cm;
                        padding-left: 10px;
                    }
                
                    h3 {
                        font-size: 10pt;
                        line-height: 11pt
                    }
                
                    .section-text {
                        font-size: 9pt;
                        line-height: 14pt;
                    }
                
                    .light {
                        font-size: 7.5pt;
                        line-height: 12pt;
                        color: #ddd;
                    }
                
                    .page {
                        width: 21cm
                    }
                
                    ul {
                        margin: 5px 0 0
                    }
                
                    .section {
                        padding: 5px 0 8px
                    }
                
                    .section-text {
                        width: 15cm;
                        margin: 5px 0 5px;
                    }
                
                    .subsection {
                        margin: 5px 0 0
                    }
                
                    .desc {
                        font-size: 9pt
                    }
                
                    .contact-info {
                        font-size: 9pt
                    }
                
                    ul.skills {
                        margin: 0 10px 0 0;
                    }
                
                    ul.skills li {
                        font-size: 9pt;
                        margin-bottom: 0
                    }
                
                }
            </style>
        <body>
            <div class="page">
                <div class="section row">
                    <h1 class="col"><span style="font-weight:700">${data.fname}</span> ${data.lname}</h1>
                    ${data.links.length > 0 &&
                        `<div class="contact-info col-right">
                            ${data.links.map((link) => 
                                `<div><a href="${link}">${link}</a></div>`
                            ).join('')}
                        </div>`
                    }
                </div>
                ${data.skills.length > 0 &&
                    `<div class="section row">
                        <h2 class="col">Skills</h2>
                        <div class="section-text col-right row">
                        ${data.skills.map((skill) => 
                            `<ul class="skills">
                                <li>${skill}</li>
                            </ul>`
                        ).join('')}
                        </div>
                    </div>`
                }
                ${data.education.length > 0 &&
                `<div class="section row">
                    <h2 class="col">Education</h2>
                    ${data.education.map((edu) => 
                    `<div class="section-text col-right">
                        <h3><span class="emph">${edu.degree}</span></h3>
                        <div>${edu.college}</div>
                        <div class="row">
                            <div class="col light">${edu.location}</div>
                            <div class="col-right light">(${edu.start} - ${edu.end})</div>
                            <div class="col-right light" style="margin-right:10px;">${edu.grade}</div>
                        </div>
                    </div>`
                    ).join('')}
                </div>`
                }
                ${data.experience.length > 0 &&
                `<div class="section row">
                    <h2 class="col">Experience</h2>
                    ${data.experience.map((exp) =>
                    `<div class="section-text col-right">
                        <div class="row">
                            <div class="col">
                                <h3>${exp.company}</h3>
                            </div>
                        </div>
                        <div class="row subsection">
                            <div class="emph col">${exp.role}</div>
                            <div class="col-right light">${exp.start} - ${exp.end}</div>
                        </div>
                        <ul class="desc">
                            ${exp.description}
                        </ul>
                    </div>`).join('')}
                </div>`
                }
                ${data.projects.length > 0 &&
                `<div class="section row">
                    <h2 class="col">Projects</h2>
                    ${data.projects.map((project) =>
                    `<div class="section-text col-right">
                        <div class="row">
                            <div class="col">
                                <h3>${project.name}</h3>
                            </div>
                        </div>
                        <div class="row subsection">
                            <a class="emph col">${project.link}</a>
                            <div class="col-right light">${project.start} - ${project.end}</div>
                        </div>
                        <ul class="desc">
                            ${project.description}
                        </ul>
                    </div>`).join('')}
                </div>`
                }
                
                ${data.awards.length > 0 &&
                `<div class="section row">
                    <h2 class="col">Honors</h2>
                    ${data.awards.map((award) =>
                    `<div class="section-text col-right">
                        <div class="row">
                            <div class="col">
                                <h3>${award.institute}</h3>
                            </div>
                        </div>
                        <div class="row subsection">
                            <div class="emph col">${award.name}</div>
                            <div class="col-right light">${award.time}</div>
                        </div>
                        <div class="desc">
                            ${award.description}
                        </div>
                    </div>`
                    ).join('')}
                </div>`}
            </div>
        </body>
    </html>`;

  return temp;
}

module.exports = minimal;
