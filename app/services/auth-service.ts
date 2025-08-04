import type { Context } from "hono";

export const postPasswordLogin = (c: Context) => {
  return c.text('password auth')
}

export const getGoogleLoginRedirect = (c: Context) => {
  return c.text('google redirect')
}

export const getGoogleLoginCallback = (c: Context) => {
  return c.text('google callback')
}
