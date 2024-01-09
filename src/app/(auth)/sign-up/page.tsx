"use client";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validators";
import { trpc } from "@/trpc/clients";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";

const Page = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<TAuthCredentialsValidator>({
		resolver: zodResolver(AuthCredentialsValidator)
	});

	const router = useRouter();

	const { mutate, isLoading } = trpc.auth.createPayLoadUser.useMutation({
		onError: (err) => {
			if (err.data?.code === "CONFLICT") {
				toast.error("This email is already in use. Please try Signing in instead");
				return;
			}

			if (err instanceof ZodError) {
				toast.error(err.issues[0].message);
				return;
			}

			toast.error("Something went wrong. Please try again. or later.");
		},
		onSuccess: ({ sentToEmail }) => {
			toast.success(`Verification email sent to ${sentToEmail}.`);
			router.push("/verify-email?to=" + sentToEmail);
		}
	});

	const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
		mutate({ email, password });
	};

	return (
		<>
			<div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col items-center space-y-2 text-center">
						<Icons.logo className="h-20 w-20" />
						<h1 className="text-2xl font-bold py-1">Create an account</h1>
						<div className="grid gap-6 pt-1">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="grid gap-2">
									<div className="grid gap-1 py-2">
										<Label htmlFor="email">Email</Label>
										<Input
											{...register("email")}
											className={cn({
												"focus-visible:ring-red-600 ": errors.email
											})}
											placeholder="example@email.com"
										/>
										{errors?.email && <p className="text-sm text-red-600 pt-0.1">{errors.email.message}</p>}
									</div>
								</div>
								<div className="grid gap-2 pb-1">
									<div className="grid gap-1 py-2">
										<Label htmlFor="password">Password</Label>
										<Input
											{...register("password")}
											type="password"
											className={cn({
												"focus-visible:ring-red-600": errors.password
											})}
											placeholder="Password"
										/>
										{errors?.password && <p className="text-sm text-red-600 pt-0.1">{errors.password.message}</p>}
									</div>
								</div>
								<div className="py-1">
									<Button>Sign-up</Button>
								</div>
							</form>
						</div>
						<div className="flex">
							<p className="pt-1 font-bold">Already have an account?</p>
							<Link
								className={buttonVariants({
									variant: "link",
									className: "italic pt-1"
								})}
								href="/sign-in"
							>
								Sign-in
								<ArrowRight className="h-5 w-5 pt-1" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
