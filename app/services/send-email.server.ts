export interface SendEmailBody {
  sender: {
    name: string
    email: string
  }
  to: {
    name?: string
    email: string
  }[]
  subject: string
  htmlContent: string
}

export const sendEmail = async (body: SendEmailBody) => {
  const EMAIL_PROVIDER_API_KEY = process.env.EMAIL_PROVIDER_API_KEY

  if (!EMAIL_PROVIDER_API_KEY)
    throw new Error('Missing EMAIL_PROVIDER_API_KEY env variable.')

  try {
    return fetch(`https://api.sendinblue.com/v3/smtp/email`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Api-Key': EMAIL_PROVIDER_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...body }),
    })
  } catch (err: unknown) {
    console.log(err)
    return null
  }
}
