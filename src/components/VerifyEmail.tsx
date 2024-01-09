"use client";
import { trpc } from "@/trpc/clients";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface VerifiedEmailProps {
	token: string;
}

const VerifyEmail = ({ token }: VerifiedEmailProps) => {
	const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
		token
	});

	if (isError) {
		return (
			<div className="flex flex-col items-center gap-2 text-center">
				<XCircle className="h-8 w-8 text-red-800" />
				<h3 className="font-semibold text-xl">Something went wrong</h3>
				<p className="text-muted-foreground text-sm ">
					Token not valid or might be expired.<br></br>
					Please try again.
				</p>
			</div>
		);
	}

	if (data?.success) {
		return (
			<div className="flex h-full flex-col items-center justify-center">
				<div className="relative mb-4 h-60 w-60 text-muted-foreground">
					<Image src="/caterpillar-email-sent.png" alt="The email was sent" fill />
				</div>

				<h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
				<p className="text-muted-foreground text-center mt-1">You&apos;re email has been verified.</p>
				<Link
					className={buttonVariants({
						className: "mt-3"
					})}
					href="/sign-in"
				>
					Sign In
				</Link>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="flex flex-col items-center gap-2 text-center">
				<Loader2 className="animate-spin h-8 w-8 text-zinc-600" />
				<h3 className="font-semibold text-xl">Verifying...</h3>
				<p className="text-muted-foreground text-sm ">This won&apos;t take long.</p>
			</div>
		);
	}
};

export default VerifyEmail;
