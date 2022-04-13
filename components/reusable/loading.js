export default function Loading({ full }) {

    if (full) {
        return (
            <div className="fixed top-0 left-0 h-full w-full z-50 bg-white bg-opacity-60 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full border-t-2 border-secondary h-16 w-16"></div>
                <p className="pt-5">Loading...</p>
            </div>
        )
    } else {
        return (
            <div className="p-10 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full border-t-2 border-secondary h-16 w-16"></div>
                <p className="pt-5">Loading...</p>
            </div>
        )
    }
}