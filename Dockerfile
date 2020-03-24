#FROM node:8.16.0
FROM node:10.18.0

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY api/package*.json ./  
USER node
RUN npm install
COPY --chown=node:node . .


# ----- WRITE PERMISSIONS -----
# Change uid and gid in order to be the same as your host !!!

# ARG GROUP_ID=1000
# ARG USER_ID=1000

# RUN groupadd --gid $GROUP_ID developer
# RUN adduser --disabled-password --gecos '' --uid $USER_ID --gid $GROUP_ID developer
# USER developer

# ----- END - WRITE PERMISSIONS -----