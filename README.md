# Introduction
This plugin is generates a table of contents for any figma file to allow editors and viewers to quickly jump into any page without having to use the side navigation.

## Demo
![video clip of using the plugin - runs the plugin once, generating a frame with all the links. Click on any link to jump to its page.](https://github.com/shantsis/Table-of-Contents/blob/main/demo.mov)


# How to Use
To run the plugin,
1. Install the plugin.
2. Open the desired file and navigate to the page you'd like to add the table of contents to.
3. From the menu, File -> Plugins -> Table of Contents.
4. Once the file runs, you should see either a success message.

# Making it Your Own
Adjust the appearance of the content or change the rules as follows:
* on line 37, add your own font family
* one line 42, define the frame appearance
* on line 68, adjust the page text appearance and the filter rule on divided sections (right now any page containing a "--" is treated as a section divider and does not get a link treatment)

