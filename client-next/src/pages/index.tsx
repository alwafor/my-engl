import {trpc} from '@/utils/trpc'

export default function Home() {
    const {data, isLoading} = trpc.useQuery(['hello'])

    if (isLoading) return <div>Loading...</div>
    if (data) return <div>{data.greeting}</div>
    return (
        <div>something is wrong again?</div>
    )
}