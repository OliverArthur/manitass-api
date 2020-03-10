const config = require('../config/config')

const deleteAccountMail = (email, user) => {
  const text = `
    <div style="
      background-color:#FFC400;
      margin: 0;
      min-width:600px;
      width:100%;
      font-family: Roboto, 'Trebuchet MS', Arial, sans-serif;">
      <h2 style="
        text-align:center;
        color:#3f3940"
        padding: 16px;>Hi ${user.firstName} ${user.lastName}</h2>
      <h1 style="
        text-align:center;
        color:#3f3940
        padding: 16px;">WE'RE SAD THAT YOU'VE DECIDED TO LEAVE US!</h1>
      <p style="
        text-align:center;
        color:#3f3940;
        padding: 16px;">
        But we understand that everything in this life is not forever. And as you requested,
        we've deleted your data from our database.<br>
      </p>
      <p style="
        font-size:14px;
        line-height:21px;
        text-align:center;
        padding: 16px;">
        <span style="
          color:#3f3940;
          padding: 16px;
          display:inline-block;">
          Bye! And we hope to meet you again in the future.
        </span>
      </p>
    </div>`

  return {
    to: email,
    from: {
      address: config.mail,
      name: 'Manitass'
    },
    subject: `Hi ${user.firstName} from Manitass`,
    text
  }
}

module.exports = deleteAccountMail
