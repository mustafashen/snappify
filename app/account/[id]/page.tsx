import Dashboard from "components/dashboard";

export const metadata = {
  title: 'Account',
  description: 'Account information dashboard'
}

export default async function page({
    params
  }: {
    params: { id: string }
  }) {
  
  const {id} = params

  return (
    <div>
      {
        id ? (
          <Dashboard/>
        ) : 
        <p>Customer Not Found</p>
      }
    </div>
  )
}
