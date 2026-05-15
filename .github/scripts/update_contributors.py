import sys
import re
import json
import urllib.request
from urllib.error import URLError

def get_user_info(username):
    """Fetch user name and avatar from GitHub API."""
    url = f"https://api.github.com/users/{username}"
    # Standard User-Agent is required by GitHub API
    req = urllib.request.Request(url, headers={'User-Agent': 'Python-urllib'})
    try:
        with urllib.request.urlopen(req) as response:
            if response.status == 200:
                data = json.loads(response.read().decode())
                # Fallback to username if name is not set
                name = data.get('name') or username
                avatar_url = data.get('avatar_url')
                return name, avatar_url
    except URLError as e:
        print(f"Warning: Failed to fetch user info from GitHub API: {e}")
    
    # Fallback to standard URL patterns if API fails
    return username, f"https://github.com/{username}.png"

def update_readme(username):
    readme_path = 'README.md'
    
    try:
        with open(readme_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: {readme_path} not found.")
        sys.exit(1)

    # Prevent duplicates - check if username is already in the file
    if f'github.com/{username.lower()}"' in content.lower():
        print(f"User {username} is already in the contributors list.")
        return

    name, avatar_url = get_user_info(username)
    
    # Generate the <td> snippet
    new_td = f'    <td align="center"><a href="https://github.com/{username}"><img src="{avatar_url}" width="120px;" alt=""/><br/><sub><b>{name}</b></sub></a></td>'

    # Locate the contributors table using HTML comment markers
    start_marker = '<!-- CONTRIBUTORS-TABLE-START -->'
    end_marker = '<!-- CONTRIBUTORS-TABLE-END -->'
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)

    if start_idx == -1 or end_idx == -1:
        print("Could not find the contributors table markers.")
        sys.exit(1)

    table_start = start_idx + len(start_marker)
    table_end = end_idx

    table_content = content[table_start:table_end]
    
    # Find all <tr>...</tr> blocks
    trs = re.findall(r'(<tr>.*?</tr>)', table_content, flags=re.DOTALL | re.IGNORECASE)
    
    if not trs:
        # If the table has no rows, create the first one
        new_tr = f"  <tr>\n{new_td}\n  </tr>\n"
        updated_table = table_content + new_tr
    else:
        last_tr = trs[-1]
        # Count existing <td> tags in the last row
        tds = re.findall(r'(<td.*?</td>)', last_tr, flags=re.DOTALL | re.IGNORECASE)
        
        if len(tds) < 6:
            # Append inside the last <tr>, right before </tr>
            insertion_point = last_tr.rlower().rfind('</tr>')
            if insertion_point == -1:
                insertion_point = len(last_tr) - 5
                
            updated_last_tr = last_tr[:insertion_point] + new_td + '\n ' + last_tr[insertion_point:]
            updated_table = table_content.replace(last_tr, updated_last_tr)
        else:
            # The last <tr> is full, append a new <tr> complete with the <td>
            new_tr = f"   <tr>\n{new_td}\n   </tr>"
            # Insert the new row directly after the last row
            updated_table = table_content.replace(last_tr, last_tr + '\n\n' + new_tr)
             
    # Stitch the file back together
    new_readme_content = content[:table_start] + updated_table + content[table_end:]
    
    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write(new_readme_content)
        
    print(f"Successfully added {username} to contributors in README.md.")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python update_contributors.py <github_username>")
        sys.exit(1)
        
    target_username = sys.argv[1]
    update_readme(target_username)
