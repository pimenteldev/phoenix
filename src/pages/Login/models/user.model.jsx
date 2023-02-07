export default function UserFormat(data) {
  return JSON.stringify({
    user_id: data.username,
    user_psw: data.password,
  })
}
