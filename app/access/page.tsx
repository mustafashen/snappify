import AccessCard from "components/access/access-card";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function page() {
  const token = cookies().get('accessToken')?.value

  if (token && token !== '') {
    redirect('/')
  }

  return (
    <div>
      <AccessCard/>
    </div>
  )
}
