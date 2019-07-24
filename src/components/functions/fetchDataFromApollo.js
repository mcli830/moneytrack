import { LOGGED_IN_USER, GET_USER_DATA } from '../../graphql/queries'

export default function(client){
  const { loggedInUser } = client.readQuery({
    query: LOGGED_IN_USER
  })
  const { User } = client.readQuery({
    query: GET_USER_DATA,
    variables: { id: loggedInUser.id }
  });
  return { user: User };
}
