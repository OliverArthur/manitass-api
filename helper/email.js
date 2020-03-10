const config = reqire('../config/config')

module.exports.newAccount = (user, email) => {
  const text = `
  <div style="backgroud-color:#FFC400; padding: 16px; min-width:600px; width:100%;">
    <h2 style="text-align:center;">Hi ${user.firstName} ${user.lastName}</h2>
    <h1 style="text-align:center;">IT'S TIME TO SEE IF YOU ARE REAL PERSON!</h1>
    <p style="text-align:center;">
      You 've received this message because your email address ${email} has been used to
      create an account in Manitass. Verify yourself by clicking below<br>
    </p>
    <a
      style="display: block;
      padding: 16px;
      font-family: Roboto, Tahoma, sans-serif
      border-radius: 4px;
      display:inline-block; background-color: rgb(34, 29, 35); color: rgb(255, 196, 0);">
      href="${config.base_url}/signup/${user.id}">
      CLICK TO VER
    </a>
    <p style="font-size:14px; line-height:21px; text-align:center;">
      <span style="color:#3f3940">
        If it wasn't you who create this account with this email. Simply ignore this email and
        don't click above.
      </span>
    </p>
  </div>`

  return {
    to: `${email}`,
    from: {
      address: config.mail,
      name: 'Manitass'
    },
    subject: `Hi ${user.firstName}, confirm your email`,
    text
  }
}
