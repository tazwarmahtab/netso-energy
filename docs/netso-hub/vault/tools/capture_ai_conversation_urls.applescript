set outputPath to POSIX file "/Users/tazwarmahtab/Netso Energy/wiki/raw/transcripts/2026-04-30-ai-conversation-url-captures.md" as text
set capturedAt to do shell script "date '+%Y-%m-%d %H:%M:%S %Z'"

set targets to {¬
	{"Claude - Building a Netso Energy expert agent", "https://claude.ai/chat/4f80f35d-98d8-465a-ada1-268c545f211e"}, ¬
	{"Claude - Comprehensive Netso Energy analysis and validation", "https://claude.ai/chat/5e198822-0552-4562-a352-e66ccb8b58fa"}, ¬
	{"Claude - Netso Energy YC application strategy", "https://claude.ai/chat/492b1668-debb-40f5-b89b-1e5bd4c8aa83"}, ¬
	{"Claude - G-Force Climate Seed Fund application analysis", "https://claude.ai/chat/f31b5ef8-49f3-4e4e-9079-e745ef878a10"}, ¬
	{"Claude - BRAC Bank project finance strategy analysis", "https://claude.ai/chat/6800450c-b733-4c24-b60f-9b4a2dc61660"}, ¬
	{"Claude - Netso current funding stage", "https://claude.ai/chat/9740a822-60fa-4d06-9ad6-602d4e3b2af4"}, ¬
	{"Claude - Daylight solar and battery benchmarking", "https://claude.ai/chat/f120daeb-fdb5-4f62-a22e-0785614fbbfb"}, ¬
	{"Claude - Designing exceptional website for Netso", "https://claude.ai/chat/0c3d063e-707c-4b73-ab12-0768591f1c9a"}, ¬
	{"Claude - Modular framing design for rooftop solar pergolas", "https://claude.ai/chat/c14a34fa-b800-4234-bdec-20d8abf75d8b"}, ¬
	{"Claude - Netso website redesign with solar calculator", "https://claude.ai/chat/f4d57aaa-e424-4318-bf9c-8a29340694dc"}, ¬
	{"Claude - Animated scroll storytelling for Netso solar pergolas", "https://claude.ai/chat/8a82cd2f-0f48-44ae-a098-f330ed0de821"}, ¬
	{"Claude - Netso startup expert assessment and feedback", "https://claude.ai/chat/fcfe6db9-bb25-45bd-9610-4dc3310659b4"}, ¬
	{"Claude - Arch Grants startup competition fit for Netso", "https://claude.ai/chat/6da677bf-78ec-4bbc-be23-5da028822f32"}, ¬
	{"Claude - Automation opportunities for Netso business model", "https://claude.ai/chat/2a54111a-1bfe-497c-99b3-9c2dccdc16e5"}, ¬
	{"Claude - Netso primary purpose and core problem", "https://claude.ai/chat/e98e2173-94a3-4646-9bfd-8414e2813c93"}, ¬
	{"Claude - Netso business model validation", "https://claude.ai/chat/8443ce55-dce5-4d9d-a475-4bde1411e99a"}, ¬
	{"Claude - Netso startup intelligence brief", "https://claude.ai/chat/5b01e1c9-2090-496a-83d1-553faa4c3390"}, ¬
	{"ChatGPT - Netso Project Context", "https://chatgpt.com/c/69effe65-b620-8320-ba17-228afe276604"}, ¬
	{"ChatGPT - Client vs Vendor Strategy", "https://chatgpt.com/c/69ef65e9-1a80-8320-b5f2-1233b7dd38ab"}, ¬
	{"ChatGPT - Netso Website Strategy", "https://chatgpt.com/c/69e349d5-b424-8321-a407-946bbb4de28c"}, ¬
	{"ChatGPT - Netso Application Advice", "https://chatgpt.com/c/69e47575-dd44-8323-8369-0b80792389f7"}, ¬
	{"ChatGPT - Build Netso in Public", "https://chatgpt.com/c/69e69ca2-fc14-8323-9e7b-a0d8d42d1ee4"}, ¬
	{"ChatGPT - Social Media Strategy for Netso", "https://chatgpt.com/c/69e44af4-3748-8321-9999-758f990ceb14"}, ¬
	{"ChatGPT - Netso Logo Animation Prompt", "https://chatgpt.com/c/69e34e6e-b648-8322-a165-f16058bc0499"}, ¬
	{"ChatGPT - Netso Business Card Design", "https://chatgpt.com/c/69d78513-e4c0-8323-a04f-744b4fc85398"}, ¬
	{"ChatGPT - Domain Choice Strategy", "https://chatgpt.com/c/69e04017-8a24-8321-8f6a-97f0a1ea8d71"}, ¬
	{"ChatGPT - 3D Website Visual Strategy", "https://chatgpt.com/c/69e01471-e564-8323-b396-0d93c570eea2"}, ¬
	{"ChatGPT - Competitor Analysis for Netso", "https://chatgpt.com/c/69dd7a7a-052c-8323-94c4-1b5036e93ecb"}, ¬
	{"ChatGPT - Netso 3D Website Strategy", "https://chatgpt.com/c/69dac0cc-9dec-83a4-bf35-126725062bc3"} ¬
}

set md to "---" & linefeed
set md to md & "created: 2026-04-30" & linefeed
set md to md & "type: raw-source" & linefeed
set md to md & "source-type: ai-conversation-url-capture" & linefeed
set md to md & "source: safari" & linefeed
set md to md & "confidence: medium" & linefeed
set md to md & "---" & linefeed & linefeed
set md to md & "# AI Conversation URL Captures - 2026-04-30" & linefeed & linefeed
set md to md & "Captured at: " & capturedAt & linefeed & linefeed
set md to md & "Scope: Netso-relevant visible recent Claude and ChatGPT conversation URLs discovered from Safari sidebars." & linefeed & linefeed
set md to md & "Limitations: Browser DOM snapshots may omit virtualized off-screen chat content, hidden artifacts, attachments, or unloaded older messages." & linefeed & linefeed

tell application "Safari"
	activate
	make new document
	delay 1
	set captureWindow to front window
	repeat with targetItem in targets
		set targetTitle to item 1 of targetItem
		set targetUrl to item 2 of targetItem
		set URL of current tab of captureWindow to targetUrl
		my waitForPage(captureWindow)
		delay 5
		set bodyText to ""
		try
			do JavaScript "window.scrollTo(0, document.body.scrollHeight)" in current tab of captureWindow
			delay 1
			set bodyText to do JavaScript "document.body ? document.body.innerText : ''" in current tab of captureWindow
		on error errMsg
			set bodyText to "[CAPTURE ERROR] " & errMsg
		end try
		set md to md & "## " & targetTitle & linefeed & linefeed
		set md to md & "URL: " & targetUrl & linefeed & linefeed
		set md to md & "```text" & linefeed
		set md to md & bodyText & linefeed
		set md to md & "```" & linefeed & linefeed
	end repeat
	try
		close captureWindow
	end try
end tell

set fileHandle to open for access file outputPath with write permission
set eof of fileHandle to 0
write md to fileHandle as «class utf8»
close access fileHandle

on waitForPage(captureWindow)
	tell application "Safari"
		repeat with i from 1 to 20
			try
				set readyState to do JavaScript "document.readyState" in current tab of captureWindow
				if readyState is "complete" then exit repeat
			end try
			delay 1
		end repeat
	end tell
end waitForPage
