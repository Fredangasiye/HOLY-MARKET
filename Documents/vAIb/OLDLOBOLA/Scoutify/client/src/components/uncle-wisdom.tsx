import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from '@supabase/auth-helpers-react';
import { Lightbulb, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Link } from "wouter";

const fetchUserStatus = async () => { /* ... your fetch user status logic ... */ };

export default function UncleWisdom() {
  const session = useSession();
  const queryClient = useQueryClient();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [askedQuestion, setAskedQuestion] = useState("");
  const [hasUsedFreeQuestion, setHasUsedFreeQuestion] = useState(false);

  const { data: userStatus, isLoading: isLoadingStatus } = useQuery({
    queryKey: ['userStatus', session?.user.id],
    queryFn: fetchUserStatus,
    enabled: !!session,
  });
  
  const aiMutation = useMutation({ /* ... your ai mutation logic ... */ });
  const subscribeMutation = useMutation({ /* ... your subscribe mutation logic ... */ });

  useEffect(() => {
    if (session) {
      const freebieUsed = localStorage.getItem(`freeQuestionUsed_${session.user.id}`);
      setHasUsedFreeQuestion(freebieUsed === 'true');
    }
  }, [session]);

  const handleAskQuestion = () => { /* ... your ask question logic ... */ };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span role="img" aria-label="wise elder" className="text-2xl">👴🏿</span> Ask Uncle Wisdom
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!session ? (
            <div className="text-center p-4 border rounded-lg bg-secondary">
                <p className="font-semibold">Want to ask a question?</p>
                <Link href="/auth"><Button className="mt-4">Sign In</Button></Link>
            </div>
        ) : isLoadingStatus ? (
            <p>Loading your status...</p>
        ) : userStatus?.isSubscribed ? (
            <>
              <p>You have unlimited questions!</p>
              <Textarea placeholder="Ask Uncle Wisdom anything..." value={question} onChange={(e) => setQuestion(e.target.value)} />
              <Button onClick={handleAskQuestion} className="w-full">Ask</Button>
            </>
        ) : hasUsedFreeQuestion ? (
            <div className="text-center p-4 border rounded-lg bg-secondary">
                <p className="font-semibold">You have used your free question.</p>
                <Link href="/pricing"><Button className="mt-4">Ask More Questions</Button></Link>
            </div>
        ) : (
            <>
              <Textarea placeholder="Ask your one free question..." value={question} onChange={(e) => setQuestion(e.target.value)}/>
              <Button onClick={handleAskQuestion} className="w-full">Ask Your Free Question</Button>
            </>
        )}
        {(askedQuestion || answer) && ( <div className="mt-4 p-4 border rounded-lg space-y-4"> {/* ... conversation log ... */} </div> )}
      </CardContent>
    </Card>
  );
}