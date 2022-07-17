function modern(data) {
    const temp = `
    <html>

    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.4.1/paper.min.css">
        <title>Resume</title>
        <style>
        @font-face {
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            src: local('Open Sans Regular'), local('OpenSans-Regular'), url("https://fonts.gstatic.com/s/opensans/v16/mem8YaGs126MiZpBA-UFVZ0b.woff2") format('woff2');
          }
          @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            src: local('Roboto'), local('Roboto-Regular'), url("https://fonts.gstatic.com/s/roboto/v19/KFOmCnqEu92Fr1Mu4mxK.woff2") format('woff2');
          }
          @page {
            size: A4;
          }
          body {
            color-adjust: exact;
            background-color: #fff;
            font-family: 'Open Sans', sans-serif;
            font-weight: 300;
            display: flex;
            justify-content: center;
          }
          .btn-print {
            z-index: 1;
            position: absolute;
            right: 20px;
            top: 20px;
          }
          .resume {
            display: block;
            font-family: 'Roboto', sans-serif;
            font-size: 13.0736px;
            font-weight: 400;
            line-height: 1.5;
            min-height: 1090.41px;
          }
          .resume h1 {
            font-size: 2.86em;
            font-weight: 600;
            letter-spacing: -0.5px;
          }
          .resume h2 {
            font-size: 1.43em;
            font-weight: 600;
            line-height: 1;
            margin-bottom: 0;
          }
          .resume p {
            margin-bottom: 1em;
          }
          .resume p:last-child {
            margin-bottom: 0;
          }
          .resume ul {
            padding-left: 20px;
          }
          .resume .resume__header,
          .resume .resume__section {
            font-family: 'Open Sans', sans-serif;
            font-size: 0.95em;
          }
          .resume .resume__header {
            padding: 6em 4em 0;
          }
          .resume .resume__section {
            margin-bottom: 4em;
          }
          .resume .resume__section:last-child {
            padding-bottom: 0;
          }
          .resume .resume__section-title {
            display: flex;
            align-items: center;
            margin-bottom: 1.43em;
          }
          .resume .resume__section-title > i {
            margin-right: 0.63em;
            font-size: 1.14em;
            background-color: #5695cd;
            color: #fff;
            border: 0.25em solid #aacae6;
            border-radius: 50%;
            width: 2.51em;
            height: 2.51em;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1.6;
          }
          .resume .resume__section-title > h2 {
            margin-top: 0;
            font-size: 1.5em;
          }
          .resume .resume__columns {
            overflow: hidden;
            padding: 4em;
            padding-top: 0;
          }
          .resume .resume__main {
            float: left;
            width: 75%;
            padding-right: 6em;
          }
          .resume .resume__side {
            float: left;
            width: 25%;
          }
          .resume .other-info p > b {
            color: #555;
          }
          .resume .info-item {
            margin-bottom: 0.2em;
            font-weight: 300;
          }
          .resume .info-item:last-child {
            margin-bottom: 0;
          }
          .resume .info-label {
            display: inline-block;
            padding-right: 0.63em;
            font-size: 1.14em;
            min-width: 2.19em;
            text-align: center;
          }
          .resume .info-label i {
            color: #5695cd;
          }
          .resume .xp-item {
            margin-bottom: 4em;
          }
          .resume .xp-item:last-child {
            margin-bottom: 0;
          }
          .resume .xp-job {
            font-size: 1.14em;
            font-weight: 600;
            line-height: 1.25;
          }
          .resume .xp-job span,
          .resume .xp-job small {
            font-weight: 400;
          }
          .resume .xp-job small {
            font-size: 0.9em;
          }
          .resume .xp-date {
            font-size: 0.8em;
            margin-top: 0.3em;
            margin-bottom: 1em;
            color: #5695cd;
          }
          .resume .extra {
            margin-bottom: 2em;
          }
          .resume .extra:last-child {
            margin-bottom: 0;
          }
          .resume .extra-info small {
            color: #666;
            display: inline-block;
            font-size: 0.7em;
          }
          .resume .extra-details,
          .resume .extra-details__progress {
            border-radius: 6px;
          }
          .resume .extra-details {
            margin-top: 0.5em;
            background-color: #d1d9e1;
            width: 100%;
            height: 5px;
            position: relative;
          }
          .resume .extra-details__progress {
            background-color: #5695cd;
            height: 5px;
            position: absolute;
            top: 0;
            left: 0;
          }
          .resume .lang-item {
            margin-bottom: 2em;
          }
          .resume .lang-item:last-child {
            margin-bottom: 0;
          }
          .resume .lang-label {
            width: 8em;
          }
          @media print {
            body {
              min-width: initial !important;
            }
            .btn-print {
              display: none;
            }
          }          
        </style>
    </head>
    
    <body class="A4">
        <div class="sheet">
            <div class="two-column resume">
                <section class="resume__section resume__header">
                    <div class="resume__content">
                        <h1>${data.name}</h1>
                        <div class="info-item"><span class="info-label"><i class="fa fa-location-arrow"></i></span><span class="info-text">${data.address}</span></div>
                        <div class="info-item"><span class="info-label"><i class="fa fa-envelope"></i></span><span class="info-text">c${data.mail}</span></div>
                        <div class="info-item"><span class="info-label"><i class="fa fa-phone"></i></span><span class="info-text">${data.phone}</span></div>
                    </div>
                </section>
                <div class="resume__columns">
                    <div class="resume__main">
                        ${data.education.length > 0 &&
                        `<section class="resume__section resume__education">
                            <div class="resume__content">
                                <div class="resume__section-title"><i class="fa fa-pencil-square-o"></i>
                                    <h2>Education</h2>
                                </div>
                                ${data.education.map(item => `
                                <div class="xp-item">
                                    <div class="xp-job">${item.degree}
                                        <span>@ ${item.college}</span><br /><small>${item.location}</small>
                                    </div>
                                    <div class="xp-date">${item.start} - ${item.end}</div>
                                    <div class="xp-date">${item.grade}</div>
                                </div>`).join('')}
                            </div>
                        </section>`}
                        ${data.experience.length > 0 &&
                        `<section class="resume__section resume__experience">
                            <div class="resume__content">
                                <div class="resume__section-title"><i class="fa fa-briefcase"></i>
                                    <h2>Experience</h2>
                                </div>
                                ${data.experience.map(item => `
                                <div class="xp-item">
                                    <div class="xp-job">${item.role}
                                        <span>@ ${item.company}</span><br /><small>${item.location}</small>
                                    </div>
                                    <div class="xp-date">${item.start} - ${item.end}</div>
                                    <div class="xp-detail">
                                        ${item.description}
                                    </div>
                                </div>`).join('')}
                            </div>
                        </section>
                        `}
                    </div>
                    <div class="resume__side">
                        ${data.skills.length > 0 &&
                        `<section class="resume__section resume__skills">
                            <div class="resume__content">
                                <div class="resume__section-title"><i class="fa fa-align-center"></i>
                                    <h2>Skills</h2>
                                </div>
                                <div class="resume__text">
                                    ${data.skills.map(item => `
                                    <div class="extra">
                                        <div class="extra-info">${item.skill}<br /></div>
                                        <div class="extra-details">
                                            <div class="extra-details__progress" style="width:${item.percent}%"></div>
                                        </div>
                                    </div>`).join('')}
                                </div>
                            </div>
                        </section>`}
                        ${data.interests.length > 0 && `
                        <section class="resume__section resume__languages">
                            <div class="resume__content">
                                <div class="resume__section-title"><i class="fa fa-globe"></i>
                                    <h2>Interests</h2>
                                </div>
                                ${data.interests.map(item => `
                                <div class="extra">
                                    <div class="extra-info">${item}</div>
                                </div>`).join('')}
                            </div>
                        </section>`}
                    </div>
                </div>
            </div>
        </div>
    </body>
    
    </html>   
    `;
    return temp;
  }
  
  module.exports = modern;
  