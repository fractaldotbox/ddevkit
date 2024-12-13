import { toast } from "@/hooks/use-toast";
import { IpfsGateway, getGatewayUrlWithCid } from "@/lib/filecoin/gateway";

export const uploadSuccessToast = ({
	cid,
	name = "",
	gateway = IpfsGateway.IpfsIo,
}: { cid: string; name?: string; gateway?: IpfsGateway }) => {
	const url = getGatewayUrlWithCid(cid, gateway);

	toast({
		title: "File uploaded",
		description: (
			<div>
				File uploaded {name} <br />
				CID:
				<a href={url} target="_blank">
					{cid}
				</a>
			</div>
		),
	});
};
