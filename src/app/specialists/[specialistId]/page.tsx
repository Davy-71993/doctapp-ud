
"use client";

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { ImagePlaceholder } from '@/components/image-placeholder';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Star, ThumbsUp, ThumbsDown, MessageSquare, Ban, ShieldX, User, Send, UserX, Flag } from 'lucide-react';
import { BookingModal } from '@/components/booking-modal';
import type { Doctor, DoctorComment, UserProfile } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

function StarRating({ rating, setRating }: { rating: number; setRating?: (rating: number) => void }) {
    const isInteractive = !!setRating;
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-5 h-5 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} ${isInteractive ? 'cursor-pointer' : ''}`}
                    onClick={() => isInteractive && setRating(star)}
                />
            ))}
        </div>
    );
}

export default function SpecialistDetailsPage() {
    const params = useParams();
    const { toast } = useToast();
    const specialistId = params.specialistId as string;
    
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(0);
    const [comments, setComments] = useState<DoctorComment[]>([]);

    useEffect(() => {
        if (!specialistId) return;

        async function fetchDetails() {
            try {
                const [doctorRes, profileRes] = await Promise.all([
                    fetch(`/api/doctors/${specialistId}`),
                    fetch('/api/user-profile')
                ]);

                if (!doctorRes.ok) {
                    throw new Error("Doctor not found");
                }

                const doctorData = await doctorRes.json();
                const profileData = await profileRes.json();

                setDoctor(doctorData);
                setComments(doctorData.comments || []);
                setUserProfile(profileData);
            } catch (error) {
                console.error("Failed to fetch details:", error);
                setDoctor(null);
            } finally {
                setLoading(false);
            }
        }
        fetchDetails();

    }, [specialistId]);
    
    // This is a simulation of getting the current user's role.
    const currentUserRole = 'patient'; // or 'admin'

    if (loading) {
        return (
             <div className="container mx-auto max-w-4xl py-8 space-y-8">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        )
    }

    if (!doctor) {
        return notFound();
    }

    const handleAddComment = () => {
        if (!newComment.trim() || newRating === 0 || !userProfile) {
            toast({
                title: "Incomplete Review",
                description: "Please provide a rating and a comment.",
                variant: "destructive",
            });
            return;
        }

        const newReview: DoctorComment = {
            id: `c${comments.length + 1}`,
            author: userProfile.name,
            avatar: userProfile.avatar,
            date: 'Just now',
            rating: newRating,
            comment: newComment,
        };

        setComments(prev => [newReview, ...prev]);
        setNewComment('');
        setNewRating(0);
        toast({
            title: "Review Submitted",
            description: "Thank you for your feedback!",
        });
    };
    
    const handleAdminAction = (action: 'Block' | 'Disqualify') => {
        toast({
            title: `Specialist ${action}ed`,
            description: `${doctor.name} has been ${action.toLowerCase()}ed.`,
            variant: action === 'Disqualify' ? 'destructive' : 'default',
        });
    }

    const handlePatientAction = (action: 'Report' | 'Disconnect') => {
        toast({
            title: `Action: ${action}`,
            description: `You have successfully ${action.toLowerCase()}ed ${doctor.name}.`,
            variant: action === 'Report' ? 'destructive' : 'default',
        });
    }


    return (
        <div className="container mx-auto max-w-4xl py-8 space-y-8">
            
            {currentUserRole === 'admin' && (
                 <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle>Admin Actions</CardTitle>
                        <CardDescription>Manage this specialist's status on the platform.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-4">
                        <Button variant="outline" onClick={() => handleAdminAction('Block')}>
                            <Ban className="mr-2 h-4 w-4" />
                            Block Specialist
                        </Button>
                        <Button variant="destructive" onClick={() => handleAdminAction('Disqualify')}>
                            <ShieldX className="mr-2 h-4 w-4" />
                            Disqualify Specialist
                        </Button>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                        <div className="relative w-32 h-32 sm:w-48 sm:h-48 rounded-lg overflow-hidden">
                             <ImagePlaceholder id={doctor.image} fill imageClassName="object-cover" />
                        </div>
                        <div className="flex-1 space-y-2">
                            <h1 className="text-3xl font-bold">{doctor.name}</h1>
                            <p className="text-lg text-primary">{doctor.specialty}</p>
                            <p className="text-muted-foreground">{doctor.hospital}</p>
                             <div className="flex items-center gap-4 pt-2">
                                <div className="flex items-center gap-1">
                                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                                    <span className="font-bold text-lg">{doctor.rating}</span>
                                    <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
                                </div>
                            </div>
                             <div className="flex items-center gap-2 pt-2">
                                <Button variant="outline" size="sm">
                                    <ThumbsUp className="mr-2 h-4 w-4" /> Like
                                </Button>
                                 <Button variant="outline" size="sm">
                                    <ThumbsDown className="mr-2 h-4 w-4" /> Dislike
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardFooter className="justify-end gap-2">
                    <BookingModal doctor={doctor} />
                    <Button variant="outline" onClick={() => handlePatientAction('Report')} className="flex-1 max-w-60">
                        <Flag className="mr-2 h-4 w-4" /> Report
                    </Button>
                    <Button variant="destructive" onClick={() => handlePatientAction('Disconnect')} className="flex-1 max-w-60">
                        <UserX className="mr-2 h-4 w-4" /> Disconnect
                    </Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>About {doctor.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        {`Dr. ${doctor.name.split(' ').slice(1).join(' ')} is a highly respected ${doctor.specialty} based at ${doctor.hospital} in ${doctor.location}. With over 10 years of experience, they are dedicated to providing the highest standard of care.`}
                    </p>
                </CardContent>
            </Card>

            {currentUserRole === 'patient' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Leave a Review</CardTitle>
                        <CardDescription>Share your experience with {doctor.name}.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Label>Your Rating:</Label>
                            <StarRating rating={newRating} setRating={setNewRating} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="comment">Your Comment:</Label>
                            <Textarea
                                id="comment"
                                placeholder="Tell us about your experience..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button onClick={handleAddComment}>
                            <Send className="mr-2 h-4 w-4" /> Submit Review
                        </Button>
                    </CardFooter>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Patient Reviews</CardTitle>
                    <CardDescription>What others are saying.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {comments.length > 0 ? comments.map((comment, index) => (
                        <div key={comment.id}>
                            <div className="flex items-start gap-4">
                                <Avatar>
                                    <ImagePlaceholder id={comment.avatar} />
                                    <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold">{comment.author}</p>
                                            <p className="text-xs text-muted-foreground">{comment.date}</p>
                                        </div>
                                        <StarRating rating={comment.rating} />
                                    </div>
                                    <p className="mt-2 text-sm text-muted-foreground">{comment.comment}</p>
                                </div>
                            </div>
                            {index < comments.length - 1 && <Separator className="mt-6" />}
                        </div>
                    )) : (
                        <div className="text-center py-8 text-muted-foreground">
                            <MessageSquare className="mx-auto h-8 w-8 mb-2" />
                            <p>No reviews yet. Be the first to share your experience!</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
