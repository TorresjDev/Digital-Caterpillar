"use client";
import { trpc } from "@/trpc/clients";
import { XCircle } from "lucide-react";
import Image from "next/image";

interface VerifiedEmailProps {
	token: string;
}

const VerifyEmail = ({ token }: VerifiedEmailProps) => {
	const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
		token
	});

	if (false) {
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
			</div>
		);
	}
};

export default VerifyEmail;
