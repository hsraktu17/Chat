import { prisma } from '@repo/db'

export default async function Home(){
  const user = await prisma.user.findFirst()
  return <div>
    {user?.email ??"no user added"}
  </div>
}