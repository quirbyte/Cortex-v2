
type Props = {
    params: Promise<{ slug: string }>;
};

export default async function OrgDetailedPage({ params }: Props) {
    const { slug } = await params;
    return <div className="w-full h-full flex justify-center items-center">
        This is {slug} page
    </div>
}