export type Interests = {
    id: string
    name: string
    color: string
}

export const interersts: Interests[] = [
    { id: '1', name: 'Gaming', color: '#FF4500' },
    { id: '2', name: 'Music', color: '#1E90FF' },
    { id: '3', name: 'Art', color: '#32CD32' },
    { id: '4', name: 'Technology', color: '#FFD700' },
    { id: '5', name: 'Sports', color: '#FF69B4' },
    { id: '6', name: 'Travel', color: '#8A22BE2' },
    { id: '7', name: 'Cooking', color: '#FF6347' },
    { id: '8', name: 'Fitness', color: '#20B2AA' },
    { id: '9', name: 'Education', color: '#FF8C00' },
    { id: '10', name: 'Lifestyle', color: '#6A5ACD' },
]

export function colorForInterest(interest: string) {
    return interersts.find(i => i.name.toLowerCase() === interest.toLowerCase())?.color
}