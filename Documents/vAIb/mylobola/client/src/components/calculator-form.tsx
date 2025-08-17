import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { calculatorFormSchema, type CalculationResult } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const culturalGroups = ["zulu", "xhosa", "pedi", "tswana", "sotho"];
// Add back all your form options...
const educationLevels = ["no-matric", "matric", "diploma", "degree", "honours", "masters", "phd", "prefer-not-say"];
const employmentOptions = ["employed", "self-employed", "student", "unemployed", "retired", "prefer-not-say"];

interface CalculatorFormProps {
  onCalculationComplete: (results: CalculationResult) => void;
  onCulturalGroupChange: (group: string) => void;
}

export default function CalculatorForm({ onCalculationComplete, onCulturalGroupChange }: CalculatorFormProps) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(calculatorFormSchema),
    defaultValues: { culturalGroup: "", education: "", employment: "" },
  });

  const mutation = useMutation({
    mutationFn: (formData: any) =>
      fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then((res) => {
        if (!res.ok) throw new Error("Calculation failed");
        return res.json();
      }),
    onSuccess: (data) => { onCalculationComplete(data); },
    onError: () => {
      toast({ title: "Error", description: "Could not complete the calculation. Please try again.", variant: "destructive" });
    },
  });

  const onSubmit = (data: any) => { mutation.mutate(data); };

  return (
    <Card className="bg-card text-card-foreground shadow-lg rounded-lg">
        <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Lobola Calculator</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="culturalGroup" render={({ field }) => ( <FormItem> <FormLabel>Cultural Group</FormLabel> <Select onValueChange={(value) => { field.onChange(value); onCulturalGroupChange(value); }} defaultValue={field.value}> <FormControl> <SelectTrigger><SelectValue placeholder="Select your cultural group" /></SelectTrigger> </FormControl> <SelectContent> {culturalGroups.map(group => <SelectItem key={group} value={group}>{group.charAt(0).toUpperCase() + group.slice(1)}</SelectItem>)} </SelectContent> </Select> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="education" render={({ field }) => ( <FormItem> <FormLabel>Education</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl> <SelectTrigger><SelectValue placeholder="Select education level" /></SelectTrigger> </FormControl> <SelectContent> {educationLevels.map(level => <SelectItem key={level} value={level}>{level.replace('-', ' ').charAt(0).toUpperCase() + level.replace('-', ' ').slice(1)}</SelectItem>)} </SelectContent> </Select> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="employment" render={({ field }) => ( <FormItem> <FormLabel>Employment</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl> <SelectTrigger><SelectValue placeholder="Select employment status" /></SelectTrigger> </FormControl> <SelectContent> {employmentOptions.map(option => <SelectItem key={option} value={option}>{option.replace('-', ' ').charAt(0).toUpperCase() + option.replace('-', ' ').slice(1)}</SelectItem>)} </SelectContent> </Select> <FormMessage /> </FormItem> )} />
                
                <Button type="submit" disabled={mutation.isPending} className="w-full text-lg py-6">
                  {mutation.isPending ? 'Calculating...' : 'Calculate Lobola Price'}
                </Button>
              </form>
            </Form>
        </CardContent>
    </Card>
  );
}