/*
  	String methods 
 */

/*BUG
	localeCompare
	match
	parseJSON

 */

// Test constructor
s = new String
assert(s == "")
assert(s.length == 0)
assert(s is String)
assert(Object.getType(s) == String)

s = new String(97);
assert(s == "97")
assert(s.length == 2)
assert(s is String)
assert(Object.getType(s) == String)


// Cast to boolean
assert(("" cast Boolean) == false)
assert(!("" ? true: false))

// Character index
s = "abcdef"
assert(s[2] == "c")


// caseCompare
s = "abcdef"
assert(s.caseCompare("abcdef") == 0)
assert(s.caseCompare("abCDef") != 0)
assert(s.caselessCompare("ABCdef") == 0)
assert("test".caseCompare("a") == 1)
assert("test".caseCompare("z") == -1)


// charAt
s = "abcdef"
assert(s.charAt(2) == "c")


// charCodeAt
s = "abcdef"
assert(s.charCodeAt(2) == 99)


// concat
s = "abc"
assert(s.concat("def", "ghi") == "abcdefghi")


// contains
s = "abcdef"
assert(s.contains("cd"))
assert(!s.contains("defg"))


// endsWith
s = "abcdef"
assert(s.endsWith("def"))
assert(!s.endsWith("defg"))
assert(!s.endsWith("abc"))


// format
assert("".format() == "")
assert("Sunny Day".format() == "Sunny Day")
assert("%s".format("Cloudy Day") == "Cloudy Day")
assert("%,d".format(1000) == "1,000")
assert("%10s".format("Day") == "       Day")

/*  TODO - not portable yet
if (Config.Floating) {
    assert("%g".format(1234.3) == "1234.3")
    assert("%e".format(1234.3) == "1.2343e+3")
    assert("%f".format(1234.3) == "1234.3")
    assert("Multi %s output %d.".format("word", 1234) == "Multi word output 1234.")
}
*/

// fromCharCode
a = String.fromCharCode(97, 98, 99)
assert(a == "abc")
assert(String.fromCharCode(97, 98, 99) == "abc")


// length
s = "abcdef"
assert(s.length == 6)


// get
count = 0
for (i in "abc") {
	assert(i == count++)
}


// getValues
count = 0
for each (i in "abc") {
	assert(i == "abc"[count++])
}


// indexOf
s = "abcdefdefdef"
assert(s.indexOf("def") == 3)
assert(s.indexOf("def", 4) == 6)


//	isDigit, isAlpha, isLower, isSpace, isUpper, isAlphaNum
assert("0".isDigit)
assert(!"a".isDigit)
assert("1234671".isDigit)
assert(!"123a671".isDigit)

assert("a".isAlpha)
assert(!"0".isAlpha)
assert("A".isAlpha)
assert(!"-".isAlpha)
assert(!"abc0def-".isAlpha)

assert("0".isAlphaNum)
assert("a".isAlphaNum)
assert("1234671".isAlphaNum)
assert("123a671".isAlphaNum)
assert(!"123@671".isAlphaNum)

assert("l".isLower)
assert(!"L".isLower)
assert("alllower".isLower)
assert(!"allNOTLower".isLower)

assert(" ".isSpace)
assert("\t".isSpace)
assert("\r".isSpace)
assert("\n".isSpace)

assert("L".isUpper)
assert(!"l".isUpper)
assert("ALLUPPER".isUpper)
assert(!"ALLnotUPPER".isUpper)
// lastIndexOf
s = "abcdefdefdef"
assert(s.lastIndexOf("def") == 9)



// printable
a = "\u0001abcd"
assert("abc\u0001\r\n".printable() == "abc\\u0001\\u000D\\u000A")


// quote
assert("abc".quote() == '"abc"')


// replace
assert("abcdef".replace("cd", "CD") == "abCDef")
assert("abcdef".replace("cd", "CDXXYYZZ") == "abCDXXYYZZef")
assert("abcdef".replace("cd", "") == "abef")

if (Config.RegularExpressions) {
    assert("abcdef".replace(/c/, "$$") == "ab$def")
}


// reverse
s = "abcdef"
assert("abcdef".reverse() == "fedcba")
assert(s == "abcdef")


// search
assert("abcdef".search("ef") == 4)


// slice
s = "abcdef"
assert(s.slice(1) == "bcdef")
assert(s.slice(1, 2) == "b")
assert(s.slice(1, -2) == "bcd")
assert(s.slice(-3) == "def")
assert(s.slice(-2, -1) == "e")
assert(s.slice(0, -4) == "ab")
assert(s.slice(0, -1, 2) == "ace")

assert("a".slice(0) == "a")
assert("a".slice(1) == "")
assert("a".slice(8) == "")


// split
a = "abc"
assert(a.split("") == "a,b,c")
assert(a.split(" ") == "abc")
a = "a b  c"
assert(a.split(" ") == "a,b,,c")

a = "/a/b/c"
assert(a.split("/") == ",a,b,c")

assert("abc".split("/") == "abc")
assert("/abc".split("/") == ",abc")
assert("//abc".split("/") == ",,abc")
assert("abc/".split("/") == "abc,")
assert("abc//".split("/") == "abc,,")
assert("abc//def".split("/") == "abc,,def")

//  split with regexp
assert("/abc/def".split(/\//g) == ",abc,def")
assert("/abc/def".split("/") == ",abc,def")

// startsWith
s = "abcdef"
assert(s.startsWith("abc"))
assert(!s.startsWith("defg"))
assert(!s.startsWith("def"))


// substring
s = "abcdef"
assert(s.substring(1) == "bcdef")
assert(s.substring(2,4) == "cd")
assert(s.substring(1, -1) == "bcdef")
assert(s.substring(1,-2) == "bcdef")


// toLowerCase
assert("ABcdEF".toLowerCase() == "abcdef")


// toPascal
assert("sunnyDay".toPascal() == "SunnyDay")
assert("SunnyDay".toPascal() == "SunnyDay")


// toUpperCase
assert("ABcdEF".toUpperCase() == "ABCDEF")


// tokenize
s = "one two 3"
a = s.tokenize("%s %s %d")
assert(a.length == 3)
assert(a[0] is String)
assert(a[0] == "one")
assert(a[1] is String)
assert(a[1] == "two")
assert(a[2] is Number)
assert(a[2] == "3")


// trim
assert("abcdef".trim() == "abcdef")
assert(" abcdef".trim() == "abcdef")
assert("  abcdef".trim() == "abcdef")
assert("abcdef ".trim() == "abcdef")
assert("abcdef  ".trim() == "abcdef")
assert("  abcdef  ".trim() == "abcdef")

assert("abcdef".trim(" ") == "abcdef")
assert(" abcdef".trim(" ") == "abcdef")
assert("  abcdef".trim(" ") == "abcdef")
assert("abcdef ".trim(" ") == "abcdef")
assert("abcdef  ".trim(" ") == "abcdef")
assert("  abcdef  ".trim(" ") == "abcdef")
assert("  abcdef  ".trim("  ") == "abcdef")
assert("   abcdef   ".trim("  ") == " abcdef ")

assert("  abcdef   ".trim().quote() == '"abcdef"')

s = "abc "
assert(s.trim() == "abc")
assert(s.trimEnd() == "abc")
assert(s.trimStart() == "abc ")

s = " abc "
assert(s.trim() == "abc")
assert(s.trimEnd() == " abc")
assert(s.trimStart() == "abc ")

// Times
assert(" ".times(5) == "     ")

// Operators

// operator: +
a = "abc"
b = "def"
c = a + b
assert(c == "abcdef")

// operator: -
a = "abcdef"
b = "def"
c = a - b
assert((a - b) == "abc")
assert(("abc" - "xyz") == "abc")


// operator: <
a = "abc"
b = "def"
assert(a < b)


// operator: %
assert("Error %,d %s" % [1024, "Some Message"] == "Error 1,024 Some Message")


