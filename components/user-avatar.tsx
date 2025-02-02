import { auth } from "@/lib/auth"
 
export default async function UserAvatar() {
  const session = await auth()
 
  if (!session?.user) return null
 
  return (
    <div>
      <p>
        <strong>{session?.user?.name}</strong> 
        <br/>
        <strong>{session?.user?.email}</strong>
      </p>
    </div>
  )
}