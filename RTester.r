library(stringdist)

#calculate Jaro-Winkler similarity between 'mouse' and 'mute'
1 - stringdist("mouse is mute with mutenes here", "mouse is muted with mutenes here...", method = "jw", p=0.1)