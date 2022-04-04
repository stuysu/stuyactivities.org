import { useMemo } from "react";
import { useHistory } from "react-router-dom";

export default function useSearchParams() {
	const { location } = useHistory();
	return useMemo(() => new URLSearchParams(location.search), [location]);
}
