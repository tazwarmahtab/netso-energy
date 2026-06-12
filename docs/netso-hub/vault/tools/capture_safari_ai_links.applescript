set outputPath to POSIX file "/Users/tazwarmahtab/Netso Energy/wiki/raw/transcripts/2026-04-30-safari-ai-links.md" as text
set capturedAt to do shell script "date '+%Y-%m-%d %H:%M:%S %Z'"

set md to "---" & linefeed
set md to md & "created: 2026-04-30" & linefeed
set md to md & "type: raw-source" & linefeed
set md to md & "source-type: browser-link-snapshot" & linefeed
set md to md & "source: safari" & linefeed
set md to md & "confidence: medium" & linefeed
set md to md & "---" & linefeed & linefeed
set md to md & "# Safari AI Link Snapshot - 2026-04-30" & linefeed & linefeed
set md to md & "Captured at: " & capturedAt & linefeed & linefeed

set js to "JSON.stringify(Array.from(document.querySelectorAll('a')).map(a => ({text: (a.innerText || a.getAttribute('aria-label') || '').trim(), href: a.href})).filter(x => x.text || x.href), null, 2)"

tell application "Safari"
	repeat with windowIndex from 1 to count of windows
		set currentWindow to window windowIndex
		repeat with tabIndex from 1 to count of tabs of currentWindow
			set currentTab to tab tabIndex of currentWindow
			set tabUrl to URL of currentTab as text
			if my isRelevant(tabUrl) then
				set tabName to name of currentTab as text
				set linkJson to ""
				try
					set linkJson to do JavaScript js in currentTab
				on error errMsg
					set linkJson to "[CAPTURE ERROR] " & errMsg
				end try
				set md to md & "## " & my cleanHeading(tabName) & linefeed & linefeed
				set md to md & "Window: " & windowIndex & " | Tab: " & tabIndex & linefeed
				set md to md & "URL: " & tabUrl & linefeed & linefeed
				set md to md & "```json" & linefeed
				set md to md & linkJson & linefeed
				set md to md & "```" & linefeed & linefeed
			end if
		end repeat
	end repeat
end tell

set fileHandle to open for access file outputPath with write permission
set eof of fileHandle to 0
write md to fileHandle as «class utf8»
close access fileHandle

on isRelevant(tabUrl)
	if tabUrl contains "chatgpt.com" then return true
	if tabUrl contains "claude.ai" then return true
	if tabUrl contains "platform.openai.com" then return true
	if tabUrl contains "developers.openai.com/codex" then return true
	if tabUrl contains "ai.azure.com" then return true
	if tabUrl contains "portal.azure.com" then return true
	if tabUrl contains "learn.microsoft.com/en-us/azure/developer/azure-developer-cli" then return true
	if tabUrl contains "speedrun.a16z.com" then return true
	return false
end isRelevant

on cleanHeading(rawHeading)
	set cleaned to rawHeading
	set cleaned to my replaceText(cleaned, "#", "")
	set cleaned to my replaceText(cleaned, linefeed, " ")
	return cleaned
end cleanHeading

on replaceText(sourceText, searchText, replacementText)
	set oldDelimiters to AppleScript's text item delimiters
	set AppleScript's text item delimiters to searchText
	set textItems to every text item of sourceText
	set AppleScript's text item delimiters to replacementText
	set newText to textItems as text
	set AppleScript's text item delimiters to oldDelimiters
	return newText
end replaceText
