import { useEffect, useState } from "react";

export function useTheme() {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
		// Check localStorage first, then system preference
		const saved = localStorage.getItem("theme");
		if (saved) {
			return saved === "dark";
		}
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	});

	useEffect(() => {
		// Apply theme to document
		const root = document.documentElement;
		if (isDarkMode) {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}

		// Save to localStorage
		localStorage.setItem("theme", isDarkMode ? "dark" : "light");
	}, [isDarkMode]);

	const toggleTheme = () => {
		setIsDarkMode((prev) => !prev);
	};

	return {
		isDarkMode,
		toggleTheme,
	};
}
